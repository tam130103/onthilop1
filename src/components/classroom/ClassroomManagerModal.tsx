import { useState, useEffect } from 'react';
import {
  getClassroomStore,
  type Student,
  type Team,
} from '@/core/classroom-store';
import styles from './ClassroomManagerModal.module.css';

export interface ClassroomManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: Student[];
  teams: Team[];
}

export function ClassroomManagerModal({
  isOpen,
  onClose,
  students,
  teams,
}: ClassroomManagerModalProps) {
  const [activeTab, setActiveTab] = useState<'roster' | 'teams'>('roster');
  
  // Add single student state
  const [newName, setNewName] = useState('');
  const [newGender, setNewGender] = useState<'Nam' | 'Nữ'>('Nam');
  const [newTeamId, setNewTeamId] = useState(teams[0]?.id || 'team-1');
  const [newNote, setNewNote] = useState('');
  const [formError, setFormError] = useState('');

  // Edit student modal state
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  // Batch paste state
  const [rawText, setRawText] = useState('');
  const [showPasteBox, setShowPasteBox] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (editingStudent) {
          setEditingStudent(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, editingStudent]);

  if (!isOpen) return null;

  // 1. CREATE: Thêm học sinh
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) {
      setFormError('Vui lòng nhập họ và tên học sinh.');
      return;
    }
    setFormError('');

    try {
      getClassroomStore().addStudent({
        name: newName.trim(),
        gender: newGender,
        teamId: newTeamId,
        note: newNote.trim(),
      });
      setNewName('');
      setNewNote('');
    } catch (err) {
      setFormError(String(err));
    }
  };

  // 2. UPDATE: Cập nhật thông tin học sinh
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent || !editingStudent.name.trim()) return;

    getClassroomStore().updateStudent(editingStudent.id, {
      name: editingStudent.name.trim(),
      gender: editingStudent.gender,
      teamId: editingStudent.teamId,
      note: editingStudent.note,
    });
    setEditingStudent(null);
  };

  // 3. DELETE: Xóa học sinh
  const handleDeleteStudent = (id: string, name: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa học sinh "${name}" khỏi cơ sở dữ liệu lớp không?`)) {
      getClassroomStore().deleteStudent(id);
    }
  };

  // 4. Batch import
  const handleImport = () => {
    if (!rawText.trim()) return;
    getClassroomStore().importStudents(rawText);
    setRawText('');
    setShowPasteBox(false);
  };

  // 5. Toggle presence
  const handleToggleAbsent = (id: string) => {
    getClassroomStore().toggleStudentAbsent(id);
  };

  // 6. Stars
  const handleAddStar = (id: string, delta: number) => {
    getClassroomStore().addStudentStar(id, delta);
  };

  // 7. Reset calls
  const handleResetCalls = () => {
    if (confirm('Làm mới lượt gọi: Tất cả học sinh sẽ được tính là 0 lượt đã gọi?')) {
      getClassroomStore().resetCallCounts();
    }
  };

  // 8. Teams
  const handleResetScores = () => {
    if (confirm('Đặt lại điểm thi đua của tất cả các tổ về 0 sao?')) {
      getClassroomStore().resetScores();
    }
  };

  const handleTeamNameChange = (teamId: string, newName: string) => {
    getClassroomStore().updateTeamName(teamId, newName);
  };

  const presentCount = students.filter((s) => !s.isAbsent).length;
  const absentCount = students.length - presentCount;

  return (
    <div className={styles.backdrop} onClick={onClose} data-testid="classroom-manager-backdrop">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>
              ⚙️ Quản Lý Học Sinh & Lớp Học
            </h2>
            <div style={{ fontSize: '12px', color: '#059669', fontWeight: 700, marginTop: '2px' }}>
              💾 Database: Supabase Cloud ☁️ + IndexedDB (Lưu vĩnh viễn, F5 không bị mất)
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose} title="Đóng">
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tabBtn} ${activeTab === 'roster' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('roster')}
          >
            👨‍🎓 Danh sách học sinh ({students.length})
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'teams' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('teams')}
          >
            🏆 Cài đặt 4 Tổ thi đua ({teams.length} tổ)
          </button>
        </div>

        {/* Body */}
        <div className={styles.body} style={{ position: 'relative' }}>
          {activeTab === 'roster' && (
            <>
              {/* Form Thêm Học Sinh Mới */}
              <form onSubmit={handleAddStudent} className={styles.addForm}>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b' }}>
                  ➕ Thêm học sinh mới vào Database:
                </div>
                <div className={styles.formRow}>
                  <input
                    type="text"
                    className={styles.formInput}
                    placeholder="Nhập họ và tên học sinh (vd: Nguyễn Minh Khang)..."
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                  <select
                    className={styles.formSelect}
                    value={newGender}
                    onChange={(e) => setNewGender(e.target.value as 'Nam' | 'Nữ')}
                  >
                    <option value="Nam">👦 Nam</option>
                    <option value="Nữ">👧 Nữ</option>
                  </select>
                  <select
                    className={styles.formSelect}
                    value={newTeamId}
                    onChange={(e) => setNewTeamId(e.target.value)}
                  >
                    {teams.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formRow}>
                  <input
                    type="text"
                    className={styles.formInput}
                    placeholder="Ghi chú (vd: Đọc to rõ, làm toán nhanh)..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                  />
                  <button type="submit" className={styles.btnPrimary} style={{ whiteSpace: 'nowrap' }}>
                    + Lưu vào Database
                  </button>
                </div>

                {formError && (
                  <div style={{ color: '#dc2626', fontSize: '12px', fontWeight: 700 }}>
                    ⚠️ {formError}
                  </div>
                )}
              </form>

              {/* Status and Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ fontSize: '14px', color: '#475569', fontWeight: 600 }}>
                  Có mặt: <strong style={{ color: '#16a34a' }}>{presentCount}</strong> | Vắng: <strong style={{ color: '#dc2626' }}>{absentCount}</strong>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button
                    className={styles.btnSecondary}
                    style={{ fontSize: '13px', padding: '6px 12px' }}
                    onClick={handleResetCalls}
                    title="Xóa lịch sử gọi tên để quay vòng lại từ đầu"
                  >
                    🔄 Xóa lượt đã gọi
                  </button>
                  <button
                    className={styles.btnSecondary}
                    style={{ fontSize: '13px', padding: '6px 12px' }}
                    onClick={() => setShowPasteBox(!showPasteBox)}
                  >
                    {showPasteBox ? 'Ẩn ô dán' : '📋 Dán danh sách Excel/Word'}
                  </button>
                </div>
              </div>

              {/* Batch Paste Box */}
              {showPasteBox && (
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '16px', border: '2px solid #e2e8f0' }}>
                  <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#64748b', fontWeight: 600 }}>
                    💡 Dán danh sách học sinh từ Excel hoặc Word (mỗi bạn một dòng):
                  </p>
                  <textarea
                    className={styles.textarea}
                    placeholder="Nguyễn Văn An&#10;Trần Thị Bình&#10;Lê Hoàng Cúc..."
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '10px' }}>
                    <button
                      className={styles.btnSecondary}
                      onClick={() => setShowPasteBox(false)}
                    >
                      Hủy
                    </button>
                    <button
                      className={styles.btnPrimary}
                      onClick={handleImport}
                    >
                      Cập nhật ({rawText.split('\n').filter((l) => l.trim()).length} học sinh)
                    </button>
                  </div>
                </div>
              )}

              {/* Danh sách học sinh Grid */}
              {students.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '30px', color: '#64748b', fontWeight: 600 }}>
                  Chưa có học sinh nào trong cơ sở dữ liệu. Hãy thêm học sinh ở trên hoặc dán danh sách!
                </div>
              ) : (
                <div className={styles.studentGrid}>
                  {students.map((student) => {
                    const team = teams.find((t) => t.id === student.teamId);

                    return (
                      <div
                        key={student.id}
                        className={`${styles.studentCard} ${student.isAbsent ? styles.studentCardAbsent : ''}`}
                      >
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '14px' }}>
                              {student.gender === 'Nữ' ? '👧' : '👦'}
                            </span>
                            <span className={`${styles.studentName} ${student.isAbsent ? styles.nameCrossed : ''}`}>
                              {student.name}
                            </span>
                          </div>

                          {team && (
                            <div
                              className={styles.teamBadgeSmall}
                              style={{
                                backgroundColor: `${team.color}20`,
                                color: team.color,
                                border: `1px solid ${team.color}50`,
                                marginTop: '4px',
                              }}
                            >
                              {team.name}
                            </div>
                          )}

                          {student.note && (
                            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px', fontStyle: 'italic' }}>
                              📝 {student.note}
                            </div>
                          )}

                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px', fontSize: '12px', color: '#475569' }}>
                            <span>🔄 Gọi: <strong>{student.callCount}</strong></span>
                            <span>⭐ Sao: <strong>{student.stars || 0}</strong></span>
                          </div>
                        </div>

                        {/* Actions per student */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
                          <button
                            className={styles.absentTag}
                            style={{
                              background: student.isAbsent ? '#ef4444' : '#10b981',
                              color: '#ffffff',
                              border: 'none',
                            }}
                            onClick={() => handleToggleAbsent(student.id)}
                            title={student.isAbsent ? 'Bấm để đánh dấu Có mặt' : 'Bấm để đánh dấu Vắng'}
                          >
                            {student.isAbsent ? 'Vắng' : 'Có mặt'}
                          </button>

                          <div style={{ display: 'flex', gap: '4px', marginTop: '2px' }}>
                            <button
                              className={styles.btnActionSmall}
                              onClick={() => handleAddStar(student.id, 1)}
                              title="Tặng 1 sao thưởng"
                            >
                              ⭐+
                            </button>
                            <button
                              className={styles.btnActionSmall}
                              onClick={() => setEditingStudent(student)}
                              title="Chỉnh sửa thông tin học sinh"
                            >
                              ✏️
                            </button>
                            <button
                              className={styles.btnActionSmall}
                              style={{ color: '#dc2626' }}
                              onClick={() => handleDeleteStudent(student.id, student.name)}
                              title="Xóa học sinh này"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {activeTab === 'teams' && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 600 }}>
                  Tùy chỉnh tên gọi của các tổ thi đua trong lớp:
                </span>
                <button
                  className={styles.btnSecondary}
                  style={{ fontSize: '13px', padding: '6px 12px' }}
                  onClick={handleResetScores}
                >
                  ⭐ Đặt lại 0 sao
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {teams.map((team, idx) => (
                  <div key={team.id} className={styles.teamRow}>
                    <div
                      className={styles.teamColorDot}
                      style={{ background: team.color }}
                    />
                    <span style={{ fontSize: '14px', fontWeight: 800, width: '60px' }}>
                      Tổ {idx + 1}:
                    </span>
                    <input
                      type="text"
                      className={styles.teamInput}
                      value={team.name}
                      onChange={(e) => handleTeamNameChange(team.id, e.target.value)}
                      placeholder="Nhập tên tổ..."
                    />
                    <span style={{ fontSize: '13px', color: '#d97706', fontWeight: 800 }}>
                      ⭐ {team.score} sao
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Edit Modal Popup */}
          {editingStudent && (
            <div className={styles.editOverlay} onClick={() => setEditingStudent(null)}>
              <div className={styles.editCard} onClick={(e) => e.stopPropagation()}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>
                  ✏️ Chỉnh sửa học sinh: {editingStudent.name}
                </h3>

                <form onSubmit={handleSaveEdit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>Họ và tên:</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      style={{ width: '100%', boxSizing: 'border-box', marginTop: '4px' }}
                      value={editingStudent.name}
                      onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                      required
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>Giới tính:</label>
                      <select
                        className={styles.formSelect}
                        style={{ width: '100%', marginTop: '4px' }}
                        value={editingStudent.gender || 'Nam'}
                        onChange={(e) => setEditingStudent({ ...editingStudent, gender: e.target.value as 'Nam' | 'Nữ' })}
                      >
                        <option value="Nam">👦 Nam</option>
                        <option value="Nữ">👧 Nữ</option>
                      </select>
                    </div>

                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>Tổ thi đua:</label>
                      <select
                        className={styles.formSelect}
                        style={{ width: '100%', marginTop: '4px' }}
                        value={editingStudent.teamId || teams[0]?.id}
                        onChange={(e) => setEditingStudent({ ...editingStudent, teamId: e.target.value })}
                      >
                        {teams.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>Ghi chú học lực:</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      style={{ width: '100%', boxSizing: 'border-box', marginTop: '4px' }}
                      value={editingStudent.note || ''}
                      onChange={(e) => setEditingStudent({ ...editingStudent, note: e.target.value })}
                      placeholder="Ghi chú về học sinh..."
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
                    <button
                      type="button"
                      className={styles.btnSecondary}
                      onClick={() => setEditingStudent(null)}
                    >
                      Hủy
                    </button>
                    <button type="submit" className={styles.btnPrimary}>
                      Lưu thay đổi
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Modal Footer */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #e2e8f0' }}>
            <button
              onClick={onClose}
              className={styles.btnSecondary}
            >
              Đóng lại (Esc)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
