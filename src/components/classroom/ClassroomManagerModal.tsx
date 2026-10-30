import { useState } from 'react';
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
  const [rawText, setRawText] = useState('');
  const [showPasteBox, setShowPasteBox] = useState(false);

  if (!isOpen) return null;

  const handleImport = () => {
    if (!rawText.trim()) return;
    getClassroomStore().importStudents(rawText);
    setRawText('');
    setShowPasteBox(false);
  };

  const handleToggleAbsent = (id: string) => {
    getClassroomStore().toggleStudentAbsent(id);
  };

  const handleResetCalls = () => {
    if (confirm('Làm mới lượt gọi: Tất cả học sinh sẽ được tính là chưa gọi lượt nào trong buổi học?')) {
      getClassroomStore().resetCallCounts();
    }
  };

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
        <div className={styles.header}>
          <h2 className={styles.title}>
            ⚙️ Quản Lý Lớp Học & Thi Đua
          </h2>
          <button className={styles.closeBtn} onClick={onClose} title="Đóng">
            ✕
          </button>
        </div>

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
            🏆 Cài đặt Tổ thi đua ({teams.length} tổ)
          </button>
        </div>

        <div className={styles.body}>
          {activeTab === 'roster' && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ fontSize: '14px', color: '#cbd5e1' }}>
                  Có mặt: <strong style={{ color: '#22c55e' }}>{presentCount}</strong> | Vắng: <strong style={{ color: '#ef4444' }}>{absentCount}</strong>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    className={styles.btnSecondary}
                    style={{ fontSize: '13px', padding: '6px 12px' }}
                    onClick={handleResetCalls}
                    title="Xóa lịch sử gọi tên của buổi hôm nay để bắt đầu phiên mới"
                  >
                    🔄 Xóa lượt đã gọi
                  </button>
                  <button
                    className={styles.btnPrimary}
                    style={{ fontSize: '13px', padding: '6px 12px' }}
                    onClick={() => setShowPasteBox(!showPasteBox)}
                  >
                    {showPasteBox ? 'Ẩn ô dán' : '📋 Dán danh sách mới'}
                  </button>
                </div>
              </div>

              {showPasteBox && (
                <div style={{ background: '#0f172a', padding: '16px', borderRadius: '10px', border: '1px solid #334155' }}>
                  <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#94a3b8' }}>
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

              <div className={styles.studentGrid}>
                {students.map((student) => (
                  <div
                    key={student.id}
                    className={`${styles.studentCard} ${student.isAbsent ? styles.studentCardAbsent : ''}`}
                  >
                    <div>
                      <div className={`${styles.studentName} ${student.isAbsent ? styles.nameCrossed : ''}`}>
                        {student.name}
                      </div>
                      <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                        Đã gọi: {student.callCount} lần
                      </div>
                    </div>
                    <button
                      className={styles.absentTag}
                      style={{
                        background: student.isAbsent ? '#ef4444' : '#334155',
                        color: student.isAbsent ? '#fff' : '#cbd5e1',
                      }}
                      onClick={() => handleToggleAbsent(student.id)}
                      title={student.isAbsent ? 'Bấm để đánh dấu Có mặt' : 'Bấm để đánh dấu Vắng mặt'}
                    >
                      {student.isAbsent ? 'Vắng' : 'Có mặt'}
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'teams' && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '14px', color: '#94a3b8' }}>
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
                    <span style={{ fontSize: '14px', fontWeight: 700, width: '60px' }}>
                      Tổ {idx + 1}:
                    </span>
                    <input
                      type="text"
                      className={styles.teamInput}
                      value={team.name}
                      onChange={(e) => handleTeamNameChange(team.id, e.target.value)}
                      placeholder="Nhập tên tổ..."
                    />
                    <span style={{ fontSize: '13px', color: '#eab308', fontWeight: 700 }}>
                      ⭐ {team.score} sao
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
