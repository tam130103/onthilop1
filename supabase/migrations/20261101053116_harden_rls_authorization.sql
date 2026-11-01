-- Tighten the policies created by 20261031_full_schema.sql.
-- Teachers can operate only on records connected to their assigned classrooms.

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.users AS app_user
    WHERE app_user.id = (SELECT auth.uid())
      AND app_user.role = 'admin'
  );
$$;

CREATE OR REPLACE FUNCTION public.is_teacher()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.users AS app_user
    WHERE app_user.id = (SELECT auth.uid())
      AND app_user.role = 'teacher'
  );
$$;

CREATE OR REPLACE FUNCTION public.is_owner()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = ''
AS $$
  SELECT (SELECT auth.uid()) IS NOT NULL;
$$;

CREATE OR REPLACE FUNCTION public.is_owner(owner_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = ''
AS $$
  SELECT owner_id IS NOT NULL
    AND owner_id = (SELECT auth.uid());
$$;

REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated, service_role;
REVOKE EXECUTE ON FUNCTION public.is_teacher() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_teacher() TO authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.is_owner() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_owner() TO authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.is_owner(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_owner(uuid) TO authenticated, service_role;

-- Do not expose the legacy password_hash column or allow profile-only writes
-- to create/delete rows without keeping Supabase Auth in sync.
REVOKE ALL PRIVILEGES ON TABLE public.users FROM PUBLIC, anon, authenticated;
REVOKE SELECT (password_hash) ON TABLE public.users FROM PUBLIC, anon, authenticated;
GRANT SELECT (id, email, full_name, role, phone_number, school_name, created_at, updated_at)
  ON TABLE public.users TO authenticated;

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classrooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teaching_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.class_mistakes ENABLE ROW LEVEL SECURITY;

-- Backfill only from a known team relationship. Unknown rows stay unassigned
-- so they are not exposed to an arbitrary classroom teacher.
UPDATE public.students AS student
SET classroom_id = team.classroom_id
FROM public.teams AS team
WHERE student.classroom_id IS NULL
  AND student.team_id = team.id
  AND team.classroom_id IS NOT NULL;

DROP POLICY IF EXISTS owner_only_users ON public.users;
DROP POLICY IF EXISTS owner_only_classrooms ON public.classrooms;
DROP POLICY IF EXISTS owner_only_teams ON public.teams;
DROP POLICY IF EXISTS owner_only_students ON public.students;
DROP POLICY IF EXISTS owner_only_attendance ON public.attendance;
DROP POLICY IF EXISTS owner_only_subjects ON public.subjects;
DROP POLICY IF EXISTS owner_only_stages ON public.stages;
DROP POLICY IF EXISTS owner_only_lessons ON public.lessons;
DROP POLICY IF EXISTS owner_only_teaching_sessions ON public.teaching_sessions;
DROP POLICY IF EXISTS owner_only_student_results ON public.student_results;
DROP POLICY IF EXISTS owner_only_class_mistakes ON public.class_mistakes;
DROP POLICY IF EXISTS users_select_self_or_admin ON public.users;
DROP POLICY IF EXISTS users_insert_admin ON public.users;
DROP POLICY IF EXISTS users_update_admin ON public.users;
DROP POLICY IF EXISTS users_delete_admin ON public.users;
DROP POLICY IF EXISTS classrooms_teacher_or_admin ON public.classrooms;
DROP POLICY IF EXISTS teams_classroom_teacher_or_admin ON public.teams;
DROP POLICY IF EXISTS students_classroom_teacher_or_admin ON public.students;
DROP POLICY IF EXISTS attendance_student_classroom_teacher_or_admin ON public.attendance;
DROP POLICY IF EXISTS subjects_authenticated_read ON public.subjects;
DROP POLICY IF EXISTS subjects_admin_insert ON public.subjects;
DROP POLICY IF EXISTS subjects_admin_update ON public.subjects;
DROP POLICY IF EXISTS subjects_admin_delete ON public.subjects;
DROP POLICY IF EXISTS stages_authenticated_read ON public.stages;
DROP POLICY IF EXISTS stages_admin_insert ON public.stages;
DROP POLICY IF EXISTS stages_admin_update ON public.stages;
DROP POLICY IF EXISTS stages_admin_delete ON public.stages;
DROP POLICY IF EXISTS lessons_read_builtin_or_owned ON public.lessons;
DROP POLICY IF EXISTS lessons_insert_admin_or_author ON public.lessons;
DROP POLICY IF EXISTS lessons_update_admin_or_author ON public.lessons;
DROP POLICY IF EXISTS lessons_delete_admin_or_author ON public.lessons;
DROP POLICY IF EXISTS teaching_sessions_classroom_teacher_or_admin ON public.teaching_sessions;
DROP POLICY IF EXISTS student_results_owned_classroom_or_admin ON public.student_results;
DROP POLICY IF EXISTS class_mistakes_classroom_teacher_or_admin ON public.class_mistakes;

-- User rows are readable by their owner; only admins may create, change, or delete roles.
CREATE POLICY users_select_self_or_admin ON public.users
  FOR SELECT TO authenticated
  USING ((SELECT public.is_admin()) OR id = (SELECT auth.uid()));

CREATE POLICY users_insert_admin ON public.users
  FOR INSERT TO authenticated
  WITH CHECK ((SELECT public.is_admin()));

CREATE POLICY users_update_admin ON public.users
  FOR UPDATE TO authenticated
  USING ((SELECT public.is_admin()))
  WITH CHECK ((SELECT public.is_admin()));

CREATE POLICY users_delete_admin ON public.users
  FOR DELETE TO authenticated
  USING ((SELECT public.is_admin()));

-- Class ownership is the root of teacher access to classroom data.
CREATE POLICY classrooms_teacher_or_admin ON public.classrooms
  FOR ALL TO authenticated
  USING (
    (SELECT public.is_admin())
    OR ((SELECT public.is_teacher()) AND teacher_id = (SELECT auth.uid()))
  )
  WITH CHECK (
    (SELECT public.is_admin())
    OR ((SELECT public.is_teacher()) AND teacher_id = (SELECT auth.uid()))
  );

CREATE POLICY teams_classroom_teacher_or_admin ON public.teams
  FOR ALL TO authenticated
  USING (
    (SELECT public.is_admin())
    OR ((SELECT public.is_teacher()) AND EXISTS (
      SELECT 1
      FROM public.classrooms AS classroom
      WHERE classroom.id = teams.classroom_id
        AND classroom.teacher_id = (SELECT auth.uid())
    ))
  )
  WITH CHECK (
    (SELECT public.is_admin())
    OR ((SELECT public.is_teacher()) AND EXISTS (
      SELECT 1
      FROM public.classrooms AS classroom
      WHERE classroom.id = teams.classroom_id
        AND classroom.teacher_id = (SELECT auth.uid())
    ))
  );

CREATE POLICY students_classroom_teacher_or_admin ON public.students
  FOR ALL TO authenticated
  USING (
    (SELECT public.is_admin())
    OR ((SELECT public.is_teacher()) AND EXISTS (
      SELECT 1
      FROM public.classrooms AS classroom
      WHERE classroom.id = students.classroom_id
        AND classroom.teacher_id = (SELECT auth.uid())
    ))
  )
  WITH CHECK (
    (SELECT public.is_admin())
    OR (
      (SELECT public.is_teacher())
      AND
      EXISTS (
        SELECT 1
        FROM public.classrooms AS classroom
        WHERE classroom.id = students.classroom_id
          AND classroom.teacher_id = (SELECT auth.uid())
      )
      AND (
        students.team_id IS NULL
        OR EXISTS (
          SELECT 1
          FROM public.teams AS team
          WHERE team.id = students.team_id
            AND team.classroom_id = students.classroom_id
        )
      )
    )
  );

CREATE POLICY attendance_student_classroom_teacher_or_admin ON public.attendance
  FOR ALL TO authenticated
  USING (
    (SELECT public.is_admin())
    OR ((SELECT public.is_teacher()) AND EXISTS (
      SELECT 1
      FROM public.students AS student
      JOIN public.classrooms AS classroom ON classroom.id = student.classroom_id
      WHERE student.id = attendance.student_id
        AND classroom.teacher_id = (SELECT auth.uid())
    ))
  )
  WITH CHECK (
    (SELECT public.is_admin())
    OR ((SELECT public.is_teacher()) AND EXISTS (
      SELECT 1
      FROM public.students AS student
      JOIN public.classrooms AS classroom ON classroom.id = student.classroom_id
      WHERE student.id = attendance.student_id
        AND classroom.teacher_id = (SELECT auth.uid())
    ))
  );

-- Curriculum is shared and readable by signed-in users; only admins may alter it.
CREATE POLICY subjects_authenticated_read ON public.subjects
  FOR SELECT TO authenticated
  USING (true);
CREATE POLICY subjects_admin_insert ON public.subjects
  FOR INSERT TO authenticated
  WITH CHECK ((SELECT public.is_admin()));
CREATE POLICY subjects_admin_update ON public.subjects
  FOR UPDATE TO authenticated
  USING ((SELECT public.is_admin()))
  WITH CHECK ((SELECT public.is_admin()));
CREATE POLICY subjects_admin_delete ON public.subjects
  FOR DELETE TO authenticated
  USING ((SELECT public.is_admin()));

CREATE POLICY stages_authenticated_read ON public.stages
  FOR SELECT TO authenticated
  USING (true);
CREATE POLICY stages_admin_insert ON public.stages
  FOR INSERT TO authenticated
  WITH CHECK ((SELECT public.is_admin()));
CREATE POLICY stages_admin_update ON public.stages
  FOR UPDATE TO authenticated
  USING ((SELECT public.is_admin()))
  WITH CHECK ((SELECT public.is_admin()));
CREATE POLICY stages_admin_delete ON public.stages
  FOR DELETE TO authenticated
  USING ((SELECT public.is_admin()));

-- Built-in lessons are public to authenticated users for reading, not for writes.
CREATE POLICY lessons_read_builtin_or_owned ON public.lessons
  FOR SELECT TO authenticated
  USING (
    (SELECT public.is_admin())
    OR ((SELECT public.is_teacher()) AND author_id = (SELECT auth.uid()))
    OR is_builtin IS TRUE
  );

CREATE POLICY lessons_insert_admin_or_author ON public.lessons
  FOR INSERT TO authenticated
  WITH CHECK (
    (SELECT public.is_admin())
    OR ((SELECT public.is_teacher()) AND author_id = (SELECT auth.uid()) AND is_builtin IS FALSE)
  );

CREATE POLICY lessons_update_admin_or_author ON public.lessons
  FOR UPDATE TO authenticated
  USING (
    (SELECT public.is_admin())
    OR ((SELECT public.is_teacher()) AND author_id = (SELECT auth.uid()) AND is_builtin IS FALSE)
  )
  WITH CHECK (
    (SELECT public.is_admin())
    OR ((SELECT public.is_teacher()) AND author_id = (SELECT auth.uid()) AND is_builtin IS FALSE)
  );

CREATE POLICY lessons_delete_admin_or_author ON public.lessons
  FOR DELETE TO authenticated
  USING (
    (SELECT public.is_admin())
    OR ((SELECT public.is_teacher()) AND author_id = (SELECT auth.uid()) AND is_builtin IS FALSE)
  );

CREATE POLICY teaching_sessions_classroom_teacher_or_admin ON public.teaching_sessions
  FOR ALL TO authenticated
  USING (
    (SELECT public.is_admin())
    OR (
      (SELECT public.is_teacher())
      AND
      teacher_id = (SELECT auth.uid())
      AND (
        classroom_id IS NULL
        OR EXISTS (
          SELECT 1
          FROM public.classrooms AS classroom
          WHERE classroom.id = teaching_sessions.classroom_id
            AND classroom.teacher_id = (SELECT auth.uid())
        )
      )
    )
  )
  WITH CHECK (
    (SELECT public.is_admin())
    OR (
      (SELECT public.is_teacher())
      AND
      teacher_id = (SELECT auth.uid())
      AND (
        classroom_id IS NULL
        OR EXISTS (
          SELECT 1
          FROM public.classrooms AS classroom
          WHERE classroom.id = teaching_sessions.classroom_id
            AND classroom.teacher_id = (SELECT auth.uid())
        )
      )
    )
  );

CREATE POLICY student_results_owned_classroom_or_admin ON public.student_results
  FOR ALL TO authenticated
  USING (
    (SELECT public.is_admin())
    OR (
      (SELECT public.is_teacher())
      AND
      (
        (
          session_id IS NULL
          AND (student_id IS NOT NULL OR team_id IS NOT NULL)
        )
        OR EXISTS (
          SELECT 1
          FROM public.teaching_sessions AS session
          WHERE session.id = student_results.session_id
            AND session.teacher_id = (SELECT auth.uid())
            AND (
              session.classroom_id IS NULL
              OR EXISTS (
                SELECT 1
                FROM public.classrooms AS classroom
                WHERE classroom.id = session.classroom_id
                  AND classroom.teacher_id = (SELECT auth.uid())
              )
            )
        )
      )
      AND (
        student_id IS NULL
        OR EXISTS (
          SELECT 1
          FROM public.students AS student
          JOIN public.classrooms AS classroom ON classroom.id = student.classroom_id
          WHERE student.id = student_results.student_id
            AND classroom.teacher_id = (SELECT auth.uid())
        )
      )
      AND (
        team_id IS NULL
        OR EXISTS (
          SELECT 1
          FROM public.teams AS team
          JOIN public.classrooms AS classroom ON classroom.id = team.classroom_id
          WHERE team.id = student_results.team_id
            AND classroom.teacher_id = (SELECT auth.uid())
        )
      )
    )
  )
  WITH CHECK (
    (SELECT public.is_admin())
    OR (
      (SELECT public.is_teacher())
      AND
      (
        (
          session_id IS NULL
          AND (student_id IS NOT NULL OR team_id IS NOT NULL)
        )
        OR EXISTS (
          SELECT 1
          FROM public.teaching_sessions AS session
          WHERE session.id = student_results.session_id
            AND session.teacher_id = (SELECT auth.uid())
            AND (
              session.classroom_id IS NULL
              OR EXISTS (
                SELECT 1
                FROM public.classrooms AS classroom
                WHERE classroom.id = session.classroom_id
                  AND classroom.teacher_id = (SELECT auth.uid())
              )
            )
        )
      )
      AND (
        student_id IS NULL
        OR EXISTS (
          SELECT 1
          FROM public.students AS student
          JOIN public.classrooms AS classroom ON classroom.id = student.classroom_id
          WHERE student.id = student_results.student_id
            AND classroom.teacher_id = (SELECT auth.uid())
        )
      )
      AND (
        team_id IS NULL
        OR EXISTS (
          SELECT 1
          FROM public.teams AS team
          JOIN public.classrooms AS classroom ON classroom.id = team.classroom_id
          WHERE team.id = student_results.team_id
            AND classroom.teacher_id = (SELECT auth.uid())
        )
      )
    )
  );

CREATE POLICY class_mistakes_classroom_teacher_or_admin ON public.class_mistakes
  FOR ALL TO authenticated
  USING (
    (SELECT public.is_admin())
    OR ((SELECT public.is_teacher()) AND EXISTS (
      SELECT 1
      FROM public.classrooms AS classroom
      WHERE classroom.id = class_mistakes.classroom_id
        AND classroom.teacher_id = (SELECT auth.uid())
    ))
  )
  WITH CHECK (
    (SELECT public.is_admin())
    OR ((SELECT public.is_teacher()) AND EXISTS (
      SELECT 1
      FROM public.classrooms AS classroom
      WHERE classroom.id = class_mistakes.classroom_id
        AND classroom.teacher_id = (SELECT auth.uid())
    ))
  );
