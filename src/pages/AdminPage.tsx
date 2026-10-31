import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  fetchAdminUsers,
  saveAdminUser,
  deleteAdminUser,
  fetchAdminClassrooms,
  saveAdminClassroom,
  fetchAdminTeams,
  saveAdminTeam,
  fetchAdminLessons,
  saveAdminLesson,
  deleteAdminLesson,
  fetchAdminSessionHistory,
  fetchAdminMistakes,
  testCloudConnection,
  type AdminUser,
  type AdminClassroom,
  type AdminTeam,
  type AdminLessonSummary,
  type AdminTeachingSessionHistory,
} from '@/core/admin-service';
import { getClassroomStore, type Student } from '@/core/classroom-store';
import { syncAllStudentsToSupabase } from '@/core/supabase-client';
import { hasActiveSession, subscribeAuth, signOut, getAuthState, type AuthState } from '@/core/auth-service';
import { downloadBackupFile, importFullBackup } from '@/core/backup-manager';
import { LessonSchema, type Lesson } from '@/schemas/content.schema';
import type { MistakeEntry } from '@/core/mistake-tracker';
import styles from './AdminPage.module.css';

type AdminTab = 'users' | 'classrooms' | 'students' | 'lessons' | 'sessions' | 'system';

export function AdminPage() {
  const navigate = useNavigate();

  // Active Tab
  const [activeTab, setActiveTab] = useState<AdminTab>('users');

  // Cloud Status
  const [authState, setAuthState] = useState<AuthState>(getAuthState());
  const [cloudStatus, setCloudStatus] = useState<{ connected: boolean; latencyMs: number; message: string }>({
    connected: false,
    latencyMs: 0,
    message: 'Đang kiểm tra kết nối...',
  });
  const [syncingCloud, setSyncingCloud] = useState(false);

  useEffect(() => {
    const unsub = subscribeAuth(setAuthState);
    return unsub;
  }, []);

  // Toast
  const [toast, setToast] = useState<string | null>(null);
  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  }, []);

  // Data states
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [classrooms, setClassrooms] = useState<AdminClassroom[]>([]);
  const [teams, setTeams] = useState<AdminTeam[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [lessons, setLessons] = useState<AdminLessonSummary[]>([]);
  const [sessionHistory, setSessionHistory] = useState<AdminTeachingSessionHistory[]>([]);
  const [mistakes, setMistakes] = useState<MistakeEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter & Search states
  const [userSearch, setUserSearch] = useState('');
  const [studentSearch, setStudentSearch] = useState('');
  const [studentTeamFilter, setStudentTeamFilter] = useState<string>('all');
  const [lessonSubjectFilter, setLessonSubjectFilter] = useState<'all' | 'math' | 'vietnamese' | 'english'>('all');
  const [lessonSearch, setLessonSearch] = useState('');

  // Modals state
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Partial<AdminUser> | null>(null);

  const [studentModalOpen, setStudentModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Partial<Student> | null>(null);

  const [classroomModalOpen, setClassroomModalOpen] = useState(false);
  const [editingClassroom, setEditingClassroom] = useState<Partial<AdminClassroom> | null>(null);

  const [lessonJsonModalOpen, setLessonJsonModalOpen] = useState(false);
  const [editingLessonJson, setEditingLessonJson] = useState<{ id: string; raw: string; error?: string } | null>(null);

  const [newLessonModalOpen, setNewLessonModalOpen] = useState(false);
  const [newLessonForm, setNewLessonForm] = useState<{
    id: string;
    title: string;
    subject: 'math' | 'vietnamese' | 'english';
    description: string;
  }>({
    id: `custom-lesson-${Date.now()}`,
    title: '',
    subject: 'math',
    description: '',
  });

  // Load all initial data
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [u, c, t, l, s, m, conn] = await Promise.all([
        fetchAdminUsers(),
        fetchAdminClassrooms(),
        fetchAdminTeams(),
        fetchAdminLessons(),
        fetchAdminSessionHistory(),
        fetchAdminMistakes(),
        testCloudConnection(),
      ]);

      setUsers(u);
      setClassrooms(c);
      setTeams(t);
      setLessons(l);
      setSessionHistory(s);
      setMistakes(m);
      setCloudStatus(conn);
      setStudents(getClassroomStore().getData().students);
    } catch (e) {
      console.error('[AdminPage] Lỗi tải dữ liệu:', e);
      showToast('⚠️ Không thể tải toàn bộ dữ liệu từ máy chủ.');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadData();
    const unsub = getClassroomStore().subscribe((data) => {
      setStudents(data.students);
    });
    return () => unsub();
  }, [loadData]);

  // Sync to Cloud
  const handleFullSync = useCallback(async () => {
    if (!hasActiveSession()) {
      showToast('⚠️ Bạn chưa đăng nhập tài khoản Cloud! Vui lòng đăng nhập để đồng bộ.');
      navigate('/login');
      return;
    }
    setSyncingCloud(true);
    try {
      const conn = await testCloudConnection();
      setCloudStatus(conn);
      if (!conn.connected) {
        showToast(`❌ ${conn.message || 'Không thể kết nối tới Supabase Cloud!'}`);
        return;
      }

      // Sync all current students to Supabase
      const allStudents = getClassroomStore().getData().students;
      await syncAllStudentsToSupabase(allStudents);

      showToast('✅ Đã đồng bộ toàn bộ dữ liệu lên Supabase Cloud thành công!');
      await loadData();
    } catch {
      showToast('❌ Lỗi khi đồng bộ lên Cloud');
    } finally {
      setSyncingCloud(false);
    }
  }, [loadData, navigate, showToast]);

  // ----------------------------------------------------
  // USER ACTIONS
  // ----------------------------------------------------
  const handleSaveUser = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser?.email || !editingUser?.full_name) {
      showToast('⚠️ Vui lòng điền họ tên và email');
      return;
    }

    const res = await saveAdminUser({
      id: editingUser.id,
      email: editingUser.email,
      full_name: editingUser.full_name,
      role: editingUser.role || 'teacher',
      phone_number: editingUser.phone_number || '',
      school_name: editingUser.school_name || 'Trường Tiểu học',
    });

    if (res.success) {
      showToast('✅ Đã lưu thông tin người dùng');
      setUserModalOpen(false);
      setEditingUser(null);
      const u = await fetchAdminUsers();
      setUsers(u);
    } else {
      showToast(`❌ Lỗi: ${res.error}`);
    }
  }, [editingUser, showToast]);

  const handleDeleteUser = useCallback(async (id: string, name: string) => {
    if (!window.confirm(`Bạn có chắc muốn xóa tài khoản "${name}"?`)) return;
    const res = await deleteAdminUser(id);
    if (res.success) {
      showToast(`🗑️ Đã xóa người dùng ${name}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } else {
      showToast(`❌ Lỗi khi xóa: ${res.error}`);
    }
  }, [showToast]);

  // ----------------------------------------------------
  // CLASSROOM & TEAM ACTIONS
  // ----------------------------------------------------
  const handleSaveClassroom = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingClassroom?.id || !editingClassroom?.name) {
      showToast('⚠️ Vui lòng nhập ID và tên lớp');
      return;
    }

    const res = await saveAdminClassroom({
      id: editingClassroom.id,
      name: editingClassroom.name,
      grade_level: editingClassroom.grade_level || 1,
      academic_year: editingClassroom.academic_year || '2025-2026',
      teacher_name: editingClassroom.teacher_name || 'Cô giáo',
      teacher_id: editingClassroom.teacher_id,
    });

    if (res.success) {
      showToast('✅ Đã cập nhật thông tin lớp học');
      setClassroomModalOpen(false);
      const c = await fetchAdminClassrooms();
      setClassrooms(c);
    } else {
      showToast(`❌ Lỗi: ${res.error}`);
    }
  }, [editingClassroom, showToast]);

  const handleUpdateTeamScore = useCallback(async (teamId: string, delta: number) => {
    const current = teams.find((t) => t.id === teamId);
    if (!current) return;
    const newScore = Math.max(0, current.score + delta);
    setTeams((prev) => prev.map((t) => (t.id === teamId ? { ...t, score: newScore } : t)));
    await saveAdminTeam({ id: teamId, name: current.name, score: newScore });
  }, [teams]);

  const handleRenameTeam = useCallback(async (teamId: string, oldName: string) => {
    const newName = window.prompt('Nhập tên mới cho tổ thi đua:', oldName);
    if (!newName || newName.trim() === '' || newName === oldName) return;
    const trimmed = newName.trim();
    setTeams((prev) => prev.map((t) => (t.id === teamId ? { ...t, name: trimmed } : t)));
    await saveAdminTeam({ id: teamId, name: trimmed });
    showToast(`✅ Đã đổi tên tổ thành "${trimmed}"`);
  }, [showToast]);

  // ----------------------------------------------------
  // STUDENT ACTIONS
  // ----------------------------------------------------
  const handleSaveStudent = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent?.name) {
      showToast('⚠️ Vui lòng nhập họ và tên học sinh');
      return;
    }

    const store = getClassroomStore();
    if (editingStudent.id) {
      store.updateStudent(editingStudent.id, {
        name: editingStudent.name.trim(),
        gender: editingStudent.gender || 'Nam',
        teamId: editingStudent.teamId || 'team-1',
        note: editingStudent.note || '',
        stars: editingStudent.stars ?? 0,
      });
      showToast('✅ Đã cập nhật học sinh');
    } else {
      store.addStudent({
        name: editingStudent.name.trim(),
        gender: editingStudent.gender || 'Nam',
        teamId: editingStudent.teamId || 'team-1',
        note: editingStudent.note || '',
      });
      showToast('✅ Đã thêm học sinh mới');
    }

    setStudentModalOpen(false);
    setEditingStudent(null);
  }, [editingStudent, showToast]);

  const handleDeleteStudent = useCallback((id: string, name: string) => {
    if (!window.confirm(`Xóa học sinh "${name}" khỏi lớp?`)) return;
    getClassroomStore().deleteStudent(id);
    showToast(`🗑️ Đã xóa học sinh ${name}`);
  }, [showToast]);

  const handleToggleAbsent = useCallback((id: string) => {
    getClassroomStore().toggleStudentAbsent(id);
  }, []);

  const handleStudentStar = useCallback((id: string, delta: number) => {
    getClassroomStore().addStudentStar(id, delta);
  }, []);

  // ----------------------------------------------------
  // LESSON ACTIONS
  // ----------------------------------------------------
  const handleCreateNewLesson = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLessonForm.title.trim()) {
      showToast('⚠️ Vui lòng nhập tiêu đề bài giảng');
      return;
    }

    const lessonData: Lesson = {
      $schema: '/content/lesson.schema.json',
      id: newLessonForm.id.trim(),
      title: newLessonForm.title.trim(),
      subject: newLessonForm.subject,
      grade: 1,
      status: 'draft',
      description: newLessonForm.description.trim() || 'Bài giảng tương tác Lớp 1',
      totalDurationMinutes: 35,
      slides: [
        {
          id: 'slide-01',
          type: 'title-slide',
          title: newLessonForm.title.trim(),
          subtitle: 'Bài giảng tương tác Lớp 1',
          audio: '/audio/ui/click.mp3',
        },
      ],
    };

    const res = await saveAdminLesson(lessonData);
    if (res.success) {
      showToast('🎉 Đã tạo bài giảng mới thành công!');
      setNewLessonModalOpen(false);
      setNewLessonForm({
        id: `custom-lesson-${Date.now()}`,
        title: '',
        subject: 'math',
        description: '',
      });
      const l = await fetchAdminLessons();
      setLessons(l);
    } else {
      showToast(`❌ Lỗi: ${res.error}`);
    }
  }, [newLessonForm, showToast]);

  const handleOpenJsonEditor = useCallback((lesson: AdminLessonSummary) => {
    const raw = lesson.content_json
      ? JSON.stringify(lesson.content_json, null, 2)
      : JSON.stringify(
          {
            $schema: '/content/lesson.schema.json',
            id: lesson.id,
            title: lesson.title,
            subject: lesson.subject,
            grade: 1,
            status: lesson.status,
            description: lesson.description || '',
            slides: [],
          },
          null,
          2
        );

    setEditingLessonJson({
      id: lesson.id,
      raw,
    });
    setLessonJsonModalOpen(true);
  }, []);

  const handleSaveJsonEditor = useCallback(async () => {
    if (!editingLessonJson) return;
    try {
      const parsed = JSON.parse(editingLessonJson.raw);
      const validate = LessonSchema.safeParse(parsed);
      if (!validate.success) {
        const err = validate.error.issues.map((i) => `[${i.path.join('.')}] ${i.message}`).join('\n');
        setEditingLessonJson((prev) => (prev ? { ...prev, error: err } : null));
        showToast('⚠️ JSON bài giảng không đúng định dạng Schema Lớp 1');
        return;
      }

      const res = await saveAdminLesson(validate.data);
      if (res.success) {
        showToast('✅ Đã lưu cập nhật bài giảng!');
        setLessonJsonModalOpen(false);
        setEditingLessonJson(null);
        const l = await fetchAdminLessons();
        setLessons(l);
      } else {
        showToast(`❌ Lỗi: ${res.error}`);
      }
    } catch (e) {
      setEditingLessonJson((prev) => (prev ? { ...prev, error: `Lỗi cú pháp JSON: ${String(e)}` } : null));
      showToast('❌ Cú pháp JSON không hợp lệ');
    }
  }, [editingLessonJson, showToast]);

  const handleDeleteLesson = useCallback(async (id: string, title: string) => {
    if (!window.confirm(`Bạn có chắc muốn xóa bài giảng "${title}"?`)) return;
    const ok = await deleteAdminLesson(id);
    if (ok) {
      showToast(`🗑️ Đã xóa bài giảng ${title}`);
      setLessons((prev) => prev.filter((l) => l.id !== id));
    } else {
      showToast('⚠️ Không thể xóa bài giảng hệ thống chuẩn');
    }
  }, [showToast]);

  // ----------------------------------------------------
  // FILTERED LISTS
  // ----------------------------------------------------
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const q = userSearch.toLowerCase();
      return (
        u.full_name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.school_name && u.school_name.toLowerCase().includes(q))
      );
    });
  }, [users, userSearch]);

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchTeam = studentTeamFilter === 'all' || s.teamId === studentTeamFilter;
      const matchSearch = !studentSearch || s.name.toLowerCase().includes(studentSearch.toLowerCase());
      return matchTeam && matchSearch;
    });
  }, [students, studentTeamFilter, studentSearch]);

  const filteredLessons = useMemo(() => {
    return lessons.filter((l) => {
      const matchSubject = lessonSubjectFilter === 'all' || l.subject === lessonSubjectFilter;
      const matchSearch =
        !lessonSearch ||
        l.title.toLowerCase().includes(lessonSearch.toLowerCase()) ||
        l.id.toLowerCase().includes(lessonSearch.toLowerCase());
      return matchSubject && matchSearch;
    });
  }, [lessons, lessonSubjectFilter, lessonSearch]);

  return (
    <div className={styles.container}>
      {/* Toast Alert */}
      {toast && <div className={styles.toast}>{toast}</div>}

      {/* Top Header */}
      <header className={styles.header}>
        <div className={styles.brand}>
          <div className={styles.brandIcon}>⚙️</div>
          <div>
            <h1 className={styles.brandTitle}>TRÌNH CHIẾU LỚP 1 — ADMIN QUẢN TRỊ</h1>
            <p className={styles.brandSubtitle}>
              Quản lý Giáo viên, Học sinh, Bài giảng & Đồng bộ Supabase Cloud
            </p>
          </div>
        </div>

        <div className={styles.headerActions}>
          <div className={styles.cloudBadge}>
            <span className={cloudStatus.connected ? styles.statusDot : styles.statusDotOffline} />
            <span>{cloudStatus.connected ? `Supabase Online (${cloudStatus.latencyMs}ms)` : 'Offline Local'}</span>
          </div>

          <button
            className={styles.syncBtn}
            onClick={handleFullSync}
            disabled={syncingCloud}
            title="Đẩy toàn bộ học sinh và thi đua lên Supabase"
          >
            {syncingCloud ? '⏳ Đang đồng bộ...' : '☁️ Đồng bộ Cloud'}
          </button>

          <Link to="/" className={styles.navBtn}>
            🏠 Trang chủ
          </Link>
          <Link to="/editor" className={styles.navBtn}>
            ✏️ Soạn bài
          </Link>
          <Link to="/presenter" className={styles.navBtn}>
            🖥️ Trình chiếu
          </Link>

          {authState.isAuthenticated ? (
            <button
              className={styles.navBtn}
              onClick={() => {
                signOut();
                showToast('Đã đăng xuất khỏi Cloud.');
              }}
              style={{ color: '#ef4444', cursor: 'pointer' }}
              title={`Đăng xuất (${authState.user?.email})`}
            >
              🚪 Đăng xuất ({authState.user?.user_metadata?.full_name || authState.user?.email?.split('@')[0]})
            </button>
          ) : (
            <Link
              to="/login"
              className={styles.navBtn}
              style={{ backgroundColor: '#4f46e5', color: '#ffffff', fontWeight: 800 }}
              title="Đăng nhập để đồng bộ với Supabase Cloud"
            >
              🔑 Đăng nhập Cloud
            </Link>
          )}
        </div>
      </header>

      {/* Navigation Tabs Bar */}
      <nav className={styles.tabsBar}>
        <button
          className={`${styles.tabItem} ${activeTab === 'users' ? styles.tabItemActive : ''}`}
          onClick={() => setActiveTab('users')}
        >
          <span>👥 Giáo viên & Người dùng</span>
          <span className={styles.tabBadge}>{users.length}</span>
        </button>

        <button
          className={`${styles.tabItem} ${activeTab === 'classrooms' ? styles.tabItemActive : ''}`}
          onClick={() => setActiveTab('classrooms')}
        >
          <span>🏫 Lớp & 4 Tổ thi đua</span>
          <span className={styles.tabBadge}>{classrooms.length}</span>
        </button>

        <button
          className={`${styles.tabItem} ${activeTab === 'students' ? styles.tabItemActive : ''}`}
          onClick={() => setActiveTab('students')}
        >
          <span>🎒 Danh sách Học sinh</span>
          <span className={styles.tabBadge}>{students.length}</span>
        </button>

        <button
          className={`${styles.tabItem} ${activeTab === 'lessons' ? styles.tabItemActive : ''}`}
          onClick={() => setActiveTab('lessons')}
        >
          <span>📚 Quản lý Bài giảng</span>
          <span className={styles.tabBadge}>{lessons.length}</span>
        </button>

        <button
          className={`${styles.tabItem} ${activeTab === 'sessions' ? styles.tabItemActive : ''}`}
          onClick={() => setActiveTab('sessions')}
        >
          <span>📊 Lịch sử dạy & Câu hay sai</span>
          <span className={styles.tabBadge}>{sessionHistory.length}</span>
        </button>

        <button
          className={`${styles.tabItem} ${activeTab === 'system' ? styles.tabItemActive : ''}`}
          onClick={() => setActiveTab('system')}
        >
          <span>⚙️ Cấu hình & Sao lưu</span>
        </button>
      </nav>

      {/* Main Content */}
      <main className={styles.main}>
        {/* ========================================================= */}
        {/* TAB 1: USERS & TEACHERS */}
        {/* ========================================================= */}
        {activeTab === 'users' && (
          <div>
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>👥 Quản lý Giáo viên & Tài khoản</h2>
                <p className={styles.sectionSubtitle}>
                  Phân quyền Admin, Giáo viên bộ môn, Giáo viên chủ nhiệm và Phụ huynh
                </p>
              </div>
              <button
                className={styles.primaryBtn}
                onClick={() => {
                  setEditingUser({
                    email: '',
                    full_name: '',
                    role: 'teacher',
                    school_name: 'Trường Tiểu học Kim Đồng',
                  });
                  setUserModalOpen(true);
                }}
              >
                ➕ Thêm tài khoản mới
              </button>
            </div>

            {/* Metrics */}
            <div className={styles.metricsGrid}>
              <div className={styles.metricCard}>
                <div className={styles.metricIcon} style={{ background: '#e0e7ff', color: '#3730a3' }}>
                  👩‍🏫
                </div>
                <div>
                  <div className={styles.metricVal}>
                    {users.filter((u) => u.role === 'teacher').length}
                  </div>
                  <div className={styles.metricLabel}>Giáo viên</div>
                </div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricIcon} style={{ background: '#fee2e2', color: '#991b1b' }}>
                  🛡️
                </div>
                <div>
                  <div className={styles.metricVal}>
                    {users.filter((u) => u.role === 'admin').length}
                  </div>
                  <div className={styles.metricLabel}>Quản trị viên (Admin)</div>
                </div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricIcon} style={{ background: '#fef3c7', color: '#92400e' }}>
                  👨‍👩‍👧
                </div>
                <div>
                  <div className={styles.metricVal}>
                    {users.filter((u) => u.role === 'parent').length}
                  </div>
                  <div className={styles.metricLabel}>Phụ huynh</div>
                </div>
              </div>
            </div>

            {/* Users Table */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>📋 Danh sách tài khoản người dùng</h3>
                <div className={styles.toolbar}>
                  <input
                    type="text"
                    placeholder="Tìm theo tên hoặc email..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    className={styles.searchInput}
                  />
                </div>
              </div>

              <div className={styles.tableResponsive}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Họ và tên</th>
                      <th>Email</th>
                      <th>Vai trò</th>
                      <th>Điện thoại</th>
                      <th>Trường học</th>
                      <th style={{ textAlign: 'center' }}>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
                          Không tìm thấy người dùng phù hợp.
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((u) => (
                        <tr key={u.id}>
                          <td>
                            <strong>{u.full_name}</strong>
                          </td>
                          <td style={{ color: '#475569' }}>{u.email}</td>
                          <td>
                            <select
                              value={u.role}
                              onChange={async (e) => {
                                const newRole = e.target.value as 'admin' | 'teacher' | 'parent';
                                const res = await saveAdminUser({ ...u, role: newRole });
                                if (res.success) {
                                  showToast(`✅ Đã phân quyền cho ${u.full_name} thành: ${newRole === 'admin' ? '🛡️ Quản trị viên (Admin)' : newRole === 'teacher' ? '👩‍🏫 Giáo viên' : '👨‍👩‍👧 Phụ huynh'}`);
                                  await loadData();
                                } else {
                                  showToast('❌ Lỗi cập nhật quyền: ' + (res.error || ''));
                                }
                              }}
                              style={{
                                padding: '4px 8px',
                                borderRadius: '8px',
                                fontSize: '13px',
                                fontWeight: 700,
                                backgroundColor: u.role === 'admin' ? '#fee2e2' : u.role === 'teacher' ? '#e0e7ff' : '#fef3c7',
                                color: u.role === 'admin' ? '#991b1b' : u.role === 'teacher' ? '#3730a3' : '#92400e',
                                border: '1.5px solid currentColor',
                                cursor: 'pointer',
                              }}
                              title="Bấm để đổi vai trò và phân quyền tài khoản này"
                            >
                              <option value="admin">🛡️ Quản trị viên (Admin)</option>
                              <option value="teacher">👩‍🏫 Giáo viên (Teacher)</option>
                              <option value="parent">👨‍👩‍👧 Phụ huynh (Parent)</option>
                            </select>
                          </td>
                          <td>{u.phone_number || '—'}</td>
                          <td>{u.school_name || '—'}</td>
                          <td style={{ textAlign: 'center' }}>
                            <div className={styles.actionBtns} style={{ justifyContent: 'center' }}>
                              <button
                                className={styles.actionBtn}
                                onClick={() => {
                                  setEditingUser(u);
                                  setUserModalOpen(true);
                                }}
                              >
                                ✏️ Sửa
                              </button>
                              <button
                                className={`${styles.actionBtn} ${styles.actionBtnDanger}`}
                                onClick={() => handleDeleteUser(u.id, u.full_name)}
                              >
                                🗑️ Xóa
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Role Permissions Matrix */}
            <div className={styles.card} style={{ marginTop: '1.5rem', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.75rem' }}>🛡️</span>
                <div>
                  <h3 className={styles.cardTitle} style={{ margin: 0 }}>Ma Trận Phân Quyền Vai Trò Hệ Thống</h3>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>
                    Quy định chi tiết quyền hạn truy cập & thao tác dữ liệu theo vai trò người dùng trong hệ thống
                  </p>
                </div>
              </div>

              <div className={styles.tableResponsive}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Nhóm quyền & Chức năng</th>
                      <th style={{ textAlign: 'center', color: '#dc2626' }}>🛡️ Quản trị viên (Admin)</th>
                      <th style={{ textAlign: 'center', color: '#4f46e5' }}>👩‍🏫 Giáo viên (Teacher)</th>
                      <th style={{ textAlign: 'center', color: '#d97706' }}>👨‍👩‍👧 Phụ huynh (Parent)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Quản lý Người dùng & Phân quyền</strong></td>
                      <td style={{ textAlign: 'center', color: '#16a34a', fontWeight: 800 }}>✅ Toàn quyền (Tất cả tài khoản)</td>
                      <td style={{ textAlign: 'center', color: '#dc2626' }}>❌ Không có quyền</td>
                      <td style={{ textAlign: 'center', color: '#dc2626' }}>❌ Không có quyền</td>
                    </tr>
                    <tr>
                      <td><strong>Quản lý Lớp học & Danh sách Học sinh</strong></td>
                      <td style={{ textAlign: 'center', color: '#16a34a', fontWeight: 800 }}>✅ Mọi lớp trong trường</td>
                      <td style={{ textAlign: 'center', color: '#2563eb', fontWeight: 700 }}>⚠️ Chỉ lớp được phân công</td>
                      <td style={{ textAlign: 'center', color: '#dc2626' }}>❌ Không có quyền</td>
                    </tr>
                    <tr>
                      <td><strong>Quản lý Bài giảng (Soạn, Sửa, Xuất bản)</strong></td>
                      <td style={{ textAlign: 'center', color: '#16a34a', fontWeight: 800 }}>✅ Toàn bộ bài giảng</td>
                      <td style={{ textAlign: 'center', color: '#2563eb', fontWeight: 700 }}>⚠️ Bài tự soạn của mình</td>
                      <td style={{ textAlign: 'center', color: '#64748b' }}>👁️ Chỉ xem bài mẫu</td>
                    </tr>
                    <tr>
                      <td><strong>Trình chiếu TV & Chấm điểm thi đua</strong></td>
                      <td style={{ textAlign: 'center', color: '#16a34a', fontWeight: 800 }}>✅ Cho phép</td>
                      <td style={{ textAlign: 'center', color: '#16a34a', fontWeight: 800 }}>✅ Cho phép</td>
                      <td style={{ textAlign: 'center', color: '#dc2626' }}>❌ Không có quyền</td>
                    </tr>
                    <tr>
                      <td><strong>Cấu hình Supabase Cloud & Sao lưu toàn hệ thống</strong></td>
                      <td style={{ textAlign: 'center', color: '#16a34a', fontWeight: 800 }}>✅ Toàn quyền</td>
                      <td style={{ textAlign: 'center', color: '#2563eb', fontWeight: 700 }}>⚠️ Tự động đồng bộ lớp</td>
                      <td style={{ textAlign: 'center', color: '#dc2626' }}>❌ Không có quyền</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: CLASSROOMS & 4 TEAMS */}
        {/* ========================================================= */}
        {activeTab === 'classrooms' && (
          <div>
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>🏫 Quản lý Lớp học & 4 Tổ thi đua</h2>
                <p className={styles.sectionSubtitle}>
                  Thông tin lớp, giáo viên chủ nhiệm và điểm thi đua 4 tổ (Sao Vàng, Măng Non, Tia Chớp, Mặt Trời)
                </p>
              </div>
              <button
                className={styles.primaryBtn}
                onClick={() => {
                  setEditingClassroom({
                    id: `class-${Date.now()}`,
                    name: 'Lớp 1A2',
                    grade_level: 1,
                    academic_year: '2025-2026',
                    teacher_name: 'Cô giáo chủ nhiệm',
                  });
                  setClassroomModalOpen(true);
                }}
              >
                ➕ Thêm lớp học mới
              </button>
            </div>

            {/* Classrooms List */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>🏫 Danh sách Lớp học</h3>
              </div>
              <div className={styles.tableResponsive}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Mã lớp</th>
                      <th>Tên lớp</th>
                      <th>Khối</th>
                      <th>Năm học</th>
                      <th>Giáo viên phụ trách</th>
                      <th style={{ textAlign: 'center' }}>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classrooms.map((c) => (
                      <tr key={c.id}>
                        <td>
                          <code>{c.id}</code>
                        </td>
                        <td>
                          <strong>{c.name}</strong>
                        </td>
                        <td>Khối {c.grade_level}</td>
                        <td>{c.academic_year}</td>
                        <td>👩‍🏫 {c.teacher_name}</td>
                        <td style={{ textAlign: 'center' }}>
                          <button
                            className={styles.actionBtn}
                            onClick={() => {
                              setEditingClassroom(c);
                              setClassroomModalOpen(true);
                            }}
                          >
                            ✏️ Chỉnh sửa lớp
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 4 Teams scoreboard */}
            <div className={styles.card} style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 className={styles.cardTitle}>🏆 Điểm thi đua 4 Tổ Lớp 1 (Đồng bộ tức thì lên TV)</h3>
                <button
                  className={styles.secondaryBtn}
                  onClick={() => {
                    if (window.confirm('Đặt lại toàn bộ điểm của 4 tổ về 0?')) {
                      getClassroomStore().resetScores();
                      setTeams((prev) => prev.map((t) => ({ ...t, score: 0 })));
                      showToast('🔄 Đã đặt lại điểm thi đua về 0');
                    }
                  }}
                >
                  🔄 Đặt lại 0 điểm
                </button>
              </div>

              <div className={styles.teamGrid}>
                {teams.map((t) => (
                  <div key={t.id} className={styles.teamCard} style={{ borderColor: t.color_hex }}>
                    <div className={styles.teamHeader}>
                      <span style={{ fontWeight: 800, fontSize: '1.05rem', color: t.color_hex }}>
                        ● {t.name}
                      </span>
                      <button
                        className={styles.actionBtn}
                        onClick={() => handleRenameTeam(t.id, t.name)}
                        title="Đổi tên tổ"
                      >
                        ✏️ Đổi tên
                      </button>
                    </div>

                    <div className={styles.teamScoreBox}>
                      <span className={styles.teamScoreNum}>{t.score}</span>
                      <div className={styles.scoreBtns}>
                        <button
                          className={styles.scoreBtn}
                          onClick={() => handleUpdateTeamScore(t.id, -1)}
                          title="Trừ 1 điểm"
                        >
                          -1
                        </button>
                        <button
                          className={styles.scoreBtn}
                          style={{ background: t.color_hex, color: 'white' }}
                          onClick={() => handleUpdateTeamScore(t.id, 1)}
                          title="Cộng 1 điểm"
                        >
                          +1
                        </button>
                        <button
                          className={styles.scoreBtn}
                          style={{ background: '#10b981', color: 'white' }}
                          onClick={() => handleUpdateTeamScore(t.id, 5)}
                          title="Cộng 5 điểm"
                        >
                          +5
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: STUDENTS */}
        {/* ========================================================= */}
        {activeTab === 'students' && (
          <div>
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>🎒 Danh sách Học sinh & Điểm danh</h2>
                <p className={styles.sectionSubtitle}>
                  Kiểm soát học sinh trong lớp, điểm danh vắng mặt, chia tổ và tích lũy sao thưởng
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  className={styles.primaryBtn}
                  onClick={() => {
                    setEditingStudent({
                      name: '',
                      gender: 'Nam',
                      teamId: teams[0]?.id || 'team-1',
                      stars: 0,
                      note: '',
                    });
                    setStudentModalOpen(true);
                  }}
                >
                  ➕ Thêm học sinh
                </button>
              </div>
            </div>

            {/* Metrics */}
            <div className={styles.metricsGrid}>
              <div className={styles.metricCard}>
                <div className={styles.metricIcon} style={{ background: '#dbeafe', color: '#1d4ed8' }}>
                  🎒
                </div>
                <div>
                  <div className={styles.metricVal}>{students.length}</div>
                  <div className={styles.metricLabel}>Tổng số học sinh</div>
                </div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricIcon} style={{ background: '#fef3c7', color: '#b45309' }}>
                  ⭐
                </div>
                <div>
                  <div className={styles.metricVal}>
                    {students.reduce((acc, s) => acc + (s.stars || 0), 0)}
                  </div>
                  <div className={styles.metricLabel}>Tổng số sao thưởng</div>
                </div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricIcon} style={{ background: '#fee2e2', color: '#991b1b' }}>
                  ❌
                </div>
                <div>
                  <div className={styles.metricVal}>
                    {students.filter((s) => s.isAbsent).length}
                  </div>
                  <div className={styles.metricLabel}>Vắng mặt hôm nay</div>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>📋 Sổ danh sách học sinh</h3>
                <div className={styles.toolbar}>
                  <select
                    className={styles.selectInput}
                    value={studentTeamFilter}
                    onChange={(e) => setStudentTeamFilter(e.target.value)}
                  >
                    <option value="all">Tất cả các tổ</option>
                    {teams.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    placeholder="Tìm tên học sinh..."
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    className={styles.searchInput}
                  />
                </div>
              </div>

              <div className={styles.tableResponsive}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Họ và tên</th>
                      <th>Giới tính</th>
                      <th>Tổ thi đua</th>
                      <th style={{ textAlign: 'center' }}>Sao thưởng</th>
                      <th style={{ textAlign: 'center' }}>Lần gọi</th>
                      <th>Điểm danh</th>
                      <th>Ghi chú</th>
                      <th style={{ textAlign: 'center' }}>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.length === 0 ? (
                      <tr>
                        <td colSpan={9} style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
                          Không có học sinh nào.
                        </td>
                      </tr>
                    ) : (
                      filteredStudents.map((s, idx) => {
                        const team = teams.find((t) => t.id === s.teamId);
                        return (
                          <tr key={s.id}>
                            <td style={{ color: '#94a3b8', fontWeight: 700 }}>{idx + 1}</td>
                            <td>
                              <strong>{s.name}</strong>
                            </td>
                            <td>{s.gender || 'Nam'}</td>
                            <td>
                              <span
                                style={{
                                  fontWeight: 700,
                                  color: team?.color_hex || '#475569',
                                }}
                              >
                                ● {team?.name || 'Chưa xếp tổ'}
                              </span>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                                <button
                                  className={styles.scoreBtn}
                                  onClick={() => handleStudentStar(s.id, -1)}
                                  style={{ width: '24px', height: '24px', fontSize: '0.8rem' }}
                                >
                                  -
                                </button>
                                <span style={{ fontWeight: 800, color: '#eab308' }}>⭐ {s.stars || 0}</span>
                                <button
                                  className={styles.scoreBtn}
                                  onClick={() => handleStudentStar(s.id, 1)}
                                  style={{ width: '24px', height: '24px', fontSize: '0.8rem' }}
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td style={{ textAlign: 'center' }}>{s.callCount || 0}</td>
                            <td>
                              <button
                                className={styles.actionBtn}
                                onClick={() => handleToggleAbsent(s.id)}
                                style={{
                                  background: s.isAbsent ? '#fee2e2' : '#dcfce7',
                                  color: s.isAbsent ? '#991b1b' : '#166534',
                                  borderColor: s.isAbsent ? '#fca5a5' : '#86efac',
                                }}
                              >
                                {s.isAbsent ? '🔴 Vắng mặt' : '🟢 Có mặt'}
                              </button>
                            </td>
                            <td style={{ color: '#64748b' }}>{s.note || '—'}</td>
                            <td style={{ textAlign: 'center' }}>
                              <div className={styles.actionBtns} style={{ justifyContent: 'center' }}>
                                <button
                                  className={styles.actionBtn}
                                  onClick={() => {
                                    setEditingStudent(s);
                                    setStudentModalOpen(true);
                                  }}
                                >
                                  ✏️ Sửa
                                </button>
                                <button
                                  className={`${styles.actionBtn} ${styles.actionBtnDanger}`}
                                  onClick={() => handleDeleteStudent(s.id, s.name)}
                                >
                                  🗑️ Xóa
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: LESSONS */}
        {/* ========================================================= */}
        {activeTab === 'lessons' && (
          <div>
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>📚 Quản lý Bài giảng & Chương trình học</h2>
                <p className={styles.sectionSubtitle}>
                  Xem, chỉnh sửa nội dung bài học, kiểm duyệt trạng thái Publish và chỉnh sửa mã JSON
                </p>
              </div>
              <button
                className={styles.primaryBtn}
                onClick={() => setNewLessonModalOpen(true)}
              >
                ➕ Tạo bài giảng mới
              </button>
            </div>

            {/* Metrics */}
            <div className={styles.metricsGrid}>
              <div className={styles.metricCard}>
                <div className={styles.metricIcon} style={{ background: '#dbeafe', color: '#1e40af' }}>
                  🔢
                </div>
                <div>
                  <div className={styles.metricVal}>
                    {lessons.filter((l) => l.subject === 'math').length}
                  </div>
                  <div className={styles.metricLabel}>Bài Toán Lớp 1</div>
                </div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricIcon} style={{ background: '#fdf2f8', color: '#9d174d' }}>
                  📖
                </div>
                <div>
                  <div className={styles.metricVal}>
                    {lessons.filter((l) => l.subject === 'vietnamese').length}
                  </div>
                  <div className={styles.metricLabel}>Bài Tiếng Việt Lớp 1</div>
                </div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricIcon} style={{ background: '#f0fdf4', color: '#166534' }}>
                  🇬🇧
                </div>
                <div>
                  <div className={styles.metricVal}>
                    {lessons.filter((l) => l.subject === 'english').length}
                  </div>
                  <div className={styles.metricLabel}>Bài Tiếng Anh Lớp 1</div>
                </div>
              </div>
            </div>

            {/* Lessons Table */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>📋 Danh mục tất cả bài giảng</h3>
                <div className={styles.toolbar}>
                  <select
                    className={styles.selectInput}
                    value={lessonSubjectFilter}
                    onChange={(e) => setLessonSubjectFilter(e.target.value as any)}
                  >
                    <option value="all">Tất cả môn học</option>
                    <option value="math">Toán Lớp 1</option>
                    <option value="vietnamese">Tiếng Việt Lớp 1</option>
                    <option value="english">Tiếng Anh Lớp 1</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Tìm tên hoặc mã bài giảng..."
                    value={lessonSearch}
                    onChange={(e) => setLessonSearch(e.target.value)}
                    className={styles.searchInput}
                  />
                </div>
              </div>

              <div className={styles.tableResponsive}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Mã bài</th>
                      <th>Môn học</th>
                      <th>Tên bài học</th>
                      <th>Số Slide</th>
                      <th>Trạng thái</th>
                      <th>Phân loại</th>
                      <th style={{ textAlign: 'center' }}>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLessons.length === 0 ? (
                      <tr>
                        <td colSpan={7} style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
                          Không tìm thấy bài giảng nào.
                        </td>
                      </tr>
                    ) : (
                      filteredLessons.map((l) => (
                        <tr key={l.id}>
                          <td>
                            <code>{l.id}</code>
                          </td>
                          <td>
                            <span
                              className={`${styles.badge} ${
                                l.subject === 'math'
                                  ? styles.badgeSubjectMath
                                  : l.subject === 'vietnamese'
                                  ? styles.badgeSubjectVn
                                  : styles.badgeSubjectEn
                              }`}
                            >
                              {l.subject === 'math' ? '🔢 Toán' : l.subject === 'vietnamese' ? '📖 Tiếng Việt' : '🇬🇧 Tiếng Anh'}
                            </span>
                          </td>
                          <td>
                            <strong>{l.title}</strong>
                            {l.description && (
                              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{l.description}</div>
                            )}
                          </td>
                          <td>{l.total_slides} slides</td>
                          <td>
                            <span
                              className={`${styles.badge} ${
                                l.status === 'publish' ? styles.badgePublish : styles.badgeDraft
                              }`}
                            >
                              {l.status === 'publish' ? '✅ Xuất bản' : '📝 Bản nháp'}
                            </span>
                          </td>
                          <td>
                            {l.is_builtin ? (
                              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>⭐ Mẫu chuẩn</span>
                            ) : (
                              <span style={{ fontSize: '0.8rem', color: '#2563eb', fontWeight: 700 }}>
                                ✏️ Tự soạn
                              </span>
                            )}
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <div className={styles.actionBtns} style={{ justifyContent: 'center' }}>
                              <button
                                className={styles.actionBtn}
                                onClick={() => navigate(`/presenter?lesson=${l.id}`)}
                                title="Trình chiếu trên lớp"
                              >
                                🖥️ Chiếu
                              </button>
                              <button
                                className={styles.actionBtn}
                                onClick={() => navigate(`/editor?lesson=${l.id}`)}
                                title="Chỉnh sửa trong Visual Editor"
                              >
                                ✏️ Sửa UI
                              </button>
                              <button
                                className={styles.actionBtn}
                                onClick={() => handleOpenJsonEditor(l)}
                                title="Xem & Sửa mã JSON trực tiếp"
                              >
                                📋 JSON
                              </button>
                              {!l.is_builtin && (
                                <button
                                  className={`${styles.actionBtn} ${styles.actionBtnDanger}`}
                                  onClick={() => handleDeleteLesson(l.id, l.title)}
                                  title="Xóa bài giảng này"
                                >
                                  🗑️
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: SESSIONS & MISTAKES */}
        {/* ========================================================= */}
        {activeTab === 'sessions' && (
          <div>
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>📊 Lịch sử Tiết dạy & Báo cáo Lớp học</h2>
                <p className={styles.sectionSubtitle}>
                  Thống kê các buổi giảng dạy trên TV và Ngân hàng câu cả lớp hay sai để ôn tập đầu giờ
                </p>
              </div>
            </div>

            {/* Mistakes Table */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>🎯 Ngân hàng Câu hỏi cả lớp hay sai (Cần ôn tập 5 phút đầu giờ)</h3>
              </div>
              <div className={styles.tableResponsive}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Mã câu</th>
                      <th>Bài học</th>
                      <th>Môn</th>
                      <th>Nội dung câu hỏi</th>
                      <th style={{ textAlign: 'center' }}>Số lượt sai</th>
                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mistakes.length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
                          🎉 Chưa có câu nào bị sai nhiều! Lớp học tiếp thu bài rất tốt.
                        </td>
                      </tr>
                    ) : (
                      mistakes.map((m) => (
                        <tr key={m.questionId}>
                          <td>
                            <code>{m.questionId}</code>
                          </td>
                          <td>{m.lessonTitle || m.lessonId}</td>
                          <td>{m.subject || 'Toán'}</td>
                          <td>
                            <strong>{m.question.prompt}</strong>
                          </td>
                          <td style={{ textAlign: 'center', color: '#ef4444', fontWeight: 800 }}>
                            {m.wrongCount} lần
                          </td>
                          <td>
                            <span className={styles.badge} style={{ background: '#fef3c7', color: '#b45309' }}>
                              ⚡ Cần ôn tập
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sessions Table */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>🕒 Lịch sử các buổi trình chiếu trên lớp</h3>
              </div>
              <div className={styles.tableResponsive}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Thời gian</th>
                      <th>Tên tiết dạy</th>
                      <th>Môn học</th>
                      <th style={{ textAlign: 'center' }}>Câu hỏi đã hỏi</th>
                      <th style={{ textAlign: 'center' }}>Câu trả lời đúng</th>
                      <th style={{ textAlign: 'center' }}>Sao đã thưởng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessionHistory.length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
                          Chưa có lịch sử buổi dạy nào được ghi nhận.
                        </td>
                      </tr>
                    ) : (
                      sessionHistory.map((s) => (
                        <tr key={s.id}>
                          <td style={{ color: '#64748b' }}>
                            {new Date(s.timestamp).toLocaleString('vi-VN')}
                          </td>
                          <td>
                            <strong>{s.title}</strong>
                          </td>
                          <td>{s.subject}</td>
                          <td style={{ textAlign: 'center' }}>{s.totalQuestions}</td>
                          <td style={{ textAlign: 'center', color: '#16a34a', fontWeight: 700 }}>
                            {s.totalCorrect}
                          </td>
                          <td style={{ textAlign: 'center', color: '#eab308', fontWeight: 800 }}>
                            ⭐ {s.starsAwarded}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: SYSTEM & BACKUP */}
        {/* ========================================================= */}
        {activeTab === 'system' && (
          <div>
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>⚙️ Cấu hình Hệ thống & Sao lưu Dữ liệu</h2>
                <p className={styles.sectionSubtitle}>
                  Kiểm soát kết nối cơ sở dữ liệu Supabase Cloud, Sao lưu toàn diện và Khôi phục
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {/* Supabase Card */}
              <div className={styles.card} style={{ padding: '1.5rem' }}>
                <h3 className={styles.cardTitle}>☁️ Kết nối Supabase Cloud</h3>
                <div style={{ margin: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700 }}>SUPABASE URL:</label>
                    <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', background: '#f8fafc', padding: '0.5rem', borderRadius: '6px' }}>
                      {import.meta.env.VITE_SUPABASE_URL || 'Chưa cấu hình URL'}
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700 }}>TÀI KHOẢN CLOUD:</label>
                    <div style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
                      {authState.isAuthenticated ? (
                        <div style={{ color: '#166534', fontWeight: 700 }}>
                          🟢 Đã đăng nhập: {authState.user?.email} (ID: {authState.user?.id})
                        </div>
                      ) : (
                        <div style={{ color: '#b45309' }}>
                          🟠 Chưa đăng nhập (Chế độ Ngoại tuyến / IndexedDB)
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700 }}>TRẠNG THÁI HIỆN TẠI:</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                      <span className={cloudStatus.connected ? styles.statusDot : styles.statusDotOffline} />
                      <strong style={{ color: cloudStatus.connected ? '#166534' : '#b45309' }}>
                        {cloudStatus.message}
                      </strong>
                    </div>
                  </div>
                </div>
                <button
                  className={styles.secondaryBtn}
                  onClick={async () => {
                    const conn = await testCloudConnection();
                    setCloudStatus(conn);
                    showToast(conn.message);
                  }}
                >
                  ⚡ Kiểm tra kết nối lại
                </button>
              </div>

              {/* Backup & Restore Card */}
              <div className={styles.card} style={{ padding: '1.5rem' }}>
                <h3 className={styles.cardTitle}>💾 Sao lưu & Khôi phục (Offline/Online)</h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0.5rem 0 1rem 0' }}>
                  Xuất toàn bộ học sinh, điểm số, bài giảng và lịch sử ra 1 file JSON duy nhất để lưu trữ an toàn hoặc chuyển sang máy tính khác.
                </p>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button
                    className={styles.primaryBtn}
                    onClick={() => {
                      downloadBackupFile();
                      showToast('💾 Đã tải file sao lưu về máy!');
                    }}
                  >
                    ⬇️ Tải file Backup (.json)
                  </button>

                  <label className={styles.secondaryBtn} style={{ cursor: 'pointer' }}>
                    ⬆️ Khôi phục từ Backup
                    <input
                      type="file"
                      accept=".json"
                      style={{ display: 'none' }}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        try {
                          const text = await file.text();
                          const res = await importFullBackup(text);
                          if (res.success) {
                            showToast('🎉 Đã khôi phục dữ liệu thành công!');
                            await loadData();
                          } else {
                            showToast(`❌ Lỗi khôi phục: ${res.error}`);
                          }
                        } catch (err) {
                          showToast(`❌ Không đọc được file: ${String(err)}`);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================= */}
      {/* MODAL 1: ADD / EDIT USER */}
      {/* ========================================================= */}
      {userModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>
                {editingUser?.id ? '✏️ Chỉnh sửa thông tin tài khoản' : '➕ Thêm tài khoản mới'}
              </h3>
              <button className={styles.closeBtn} onClick={() => setUserModalOpen(false)}>
                &times;
              </button>
            </div>
            <form onSubmit={handleSaveUser}>
              <div className={styles.modalBody}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Họ và tên *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Cô Nguyễn Thu Tâm"
                    value={editingUser?.full_name || ''}
                    onChange={(e) => setEditingUser((prev) => ({ ...prev, full_name: e.target.value }))}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Email đăng nhập *</label>
                  <input
                    type="email"
                    required
                    placeholder="Ví dụ: giaovien@onthi.app"
                    value={editingUser?.email || ''}
                    onChange={(e) => setEditingUser((prev) => ({ ...prev, email: e.target.value }))}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Vai trò *</label>
                  <select
                    value={editingUser?.role || 'teacher'}
                    onChange={(e) => setEditingUser((prev) => ({ ...prev, role: e.target.value as any }))}
                    className={styles.formSelect}
                  >
                    <option value="teacher">👩‍🏫 Giáo viên</option>
                    <option value="admin">🛡️ Quản trị viên (Admin)</option>
                    <option value="parent">👨‍👩‍👧 Phụ huynh</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Số điện thoại</label>
                  <input
                    type="tel"
                    placeholder="0988..."
                    value={editingUser?.phone_number || ''}
                    onChange={(e) => setEditingUser((prev) => ({ ...prev, phone_number: e.target.value }))}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Trường học công tác</label>
                  <input
                    type="text"
                    placeholder="Trường Tiểu học..."
                    value={editingUser?.school_name || ''}
                    onChange={(e) => setEditingUser((prev) => ({ ...prev, school_name: e.target.value }))}
                    className={styles.formInput}
                  />
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button type="button" className={styles.secondaryBtn} onClick={() => setUserModalOpen(false)}>
                  Hủy
                </button>
                <button type="submit" className={styles.primaryBtn}>
                  💾 Lưu tài khoản
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: ADD / EDIT STUDENT */}
      {/* ========================================================= */}
      {studentModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>
                {editingStudent?.id ? '✏️ Chỉnh sửa thông tin học sinh' : '➕ Thêm học sinh vào lớp'}
              </h3>
              <button className={styles.closeBtn} onClick={() => setStudentModalOpen(false)}>
                &times;
              </button>
            </div>
            <form onSubmit={handleSaveStudent}>
              <div className={styles.modalBody}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Họ và tên bé *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Nguyễn Văn An"
                    value={editingStudent?.name || ''}
                    onChange={(e) => setEditingStudent((prev) => ({ ...prev, name: e.target.value }))}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Giới tính</label>
                  <select
                    value={editingStudent?.gender || 'Nam'}
                    onChange={(e) => setEditingStudent((prev) => ({ ...prev, gender: e.target.value as any }))}
                    className={styles.formSelect}
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Phân vào tổ thi đua</label>
                  <select
                    value={editingStudent?.teamId || teams[0]?.id || 'team-1'}
                    onChange={(e) => setEditingStudent((prev) => ({ ...prev, teamId: e.target.value }))}
                    className={styles.formSelect}
                  >
                    {teams.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Số sao thưởng khởi điểm</label>
                  <input
                    type="number"
                    min="0"
                    value={editingStudent?.stars ?? 0}
                    onChange={(e) => setEditingStudent((prev) => ({ ...prev, stars: Number(e.target.value) }))}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Ghi chú sư phạm</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Hay phát biểu, cần kèm thêm tính nhẩm..."
                    value={editingStudent?.note || ''}
                    onChange={(e) => setEditingStudent((prev) => ({ ...prev, note: e.target.value }))}
                    className={styles.formInput}
                  />
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button type="button" className={styles.secondaryBtn} onClick={() => setStudentModalOpen(false)}>
                  Hủy
                </button>
                <button type="submit" className={styles.primaryBtn}>
                  💾 Lưu học sinh
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 3: EDIT CLASSROOM */}
      {/* ========================================================= */}
      {classroomModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>🏫 Chỉnh sửa thông tin Lớp học</h3>
              <button className={styles.closeBtn} onClick={() => setClassroomModalOpen(false)}>
                &times;
              </button>
            </div>
            <form onSubmit={handleSaveClassroom}>
              <div className={styles.modalBody}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Mã định danh lớp (ID) *</label>
                  <input
                    type="text"
                    required
                    value={editingClassroom?.id || ''}
                    onChange={(e) => setEditingClassroom((prev) => ({ ...prev, id: e.target.value }))}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Tên lớp học *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Lớp 1A1"
                    value={editingClassroom?.name || ''}
                    onChange={(e) => setEditingClassroom((prev) => ({ ...prev, name: e.target.value }))}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Năm học</label>
                  <input
                    type="text"
                    placeholder="2025-2026"
                    value={editingClassroom?.academic_year || '2025-2026'}
                    onChange={(e) => setEditingClassroom((prev) => ({ ...prev, academic_year: e.target.value }))}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Giáo viên chủ nhiệm</label>
                  <input
                    type="text"
                    placeholder="Cô Thu Tâm"
                    value={editingClassroom?.teacher_name || ''}
                    onChange={(e) => setEditingClassroom((prev) => ({ ...prev, teacher_name: e.target.value }))}
                    className={styles.formInput}
                  />
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button type="button" className={styles.secondaryBtn} onClick={() => setClassroomModalOpen(false)}>
                  Hủy
                </button>
                <button type="submit" className={styles.primaryBtn}>
                  💾 Lưu lớp học
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 4: CREATE LESSON */}
      {/* ========================================================= */}
      {newLessonModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>➕ Tạo bài giảng tương tác mới</h3>
              <button className={styles.closeBtn} onClick={() => setNewLessonModalOpen(false)}>
                &times;
              </button>
            </div>
            <form onSubmit={handleCreateNewLesson}>
              <div className={styles.modalBody}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Mã bài giảng (ID không dấu, gạch ngang) *</label>
                  <input
                    type="text"
                    required
                    value={newLessonForm.id}
                    onChange={(e) => setNewLessonForm((prev) => ({ ...prev, id: e.target.value }))}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Môn học *</label>
                  <select
                    value={newLessonForm.subject}
                    onChange={(e) => setNewLessonForm((prev) => ({ ...prev, subject: e.target.value as any }))}
                    className={styles.formSelect}
                  >
                    <option value="math">🔢 Toán Lớp 1</option>
                    <option value="vietnamese">📖 Tiếng Việt Lớp 1</option>
                    <option value="english">🇬🇧 Tiếng Anh Lớp 1</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Tiêu đề bài học *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Bài 5: Phép cộng trong phạm vi 10"
                    value={newLessonForm.title}
                    onChange={(e) => setNewLessonForm((prev) => ({ ...prev, title: e.target.value }))}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Mô tả bài học</label>
                  <textarea
                    rows={3}
                    placeholder="Mục tiêu bài học, kỹ năng đạt được..."
                    value={newLessonForm.description}
                    onChange={(e) => setNewLessonForm((prev) => ({ ...prev, description: e.target.value }))}
                    className={styles.formTextarea}
                  />
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button type="button" className={styles.secondaryBtn} onClick={() => setNewLessonModalOpen(false)}>
                  Hủy
                </button>
                <button type="submit" className={styles.primaryBtn}>
                  ✨ Khởi tạo bài học
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 5: JSON EDITOR */}
      {/* ========================================================= */}
      {lessonJsonModalOpen && editingLessonJson && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent} style={{ maxWidth: '850px' }}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>
                📋 Chỉnh sửa mã JSON Bài giảng: <code>{editingLessonJson.id}</code>
              </h3>
              <button className={styles.closeBtn} onClick={() => setLessonJsonModalOpen(false)}>
                &times;
              </button>
            </div>
            <div className={styles.modalBody}>
              {editingLessonJson.error && (
                <div style={{ background: '#fee2e2', color: '#991b1b', padding: '0.75rem', borderRadius: '8px', fontSize: '0.85rem', whiteSpace: 'pre-wrap' }}>
                  {editingLessonJson.error}
                </div>
              )}
              <textarea
                rows={18}
                value={editingLessonJson.raw}
                onChange={(e) => {
                  const val = e.target.value;
                  setEditingLessonJson((prev) => (prev ? { ...prev, raw: val, error: undefined } : null));
                }}
                className={styles.formTextarea}
                style={{ fontFamily: 'monospace', fontSize: '0.825rem', lineHeight: '1.4' }}
              />
            </div>
            <div className={styles.modalFooter}>
              <button
                type="button"
                className={styles.secondaryBtn}
                onClick={() => {
                  const blob = new Blob([editingLessonJson.raw], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${editingLessonJson.id}.json`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
              >
                ⬇️ Tải JSON về máy
              </button>
              <button type="button" className={styles.secondaryBtn} onClick={() => setLessonJsonModalOpen(false)}>
                Đóng
              </button>
              <button type="button" className={styles.primaryBtn} onClick={handleSaveJsonEditor}>
                💾 Kiểm tra & Lưu JSON
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
