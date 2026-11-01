import { withSupabase } from '@supabase/server';

type UserRole = 'admin' | 'teacher' | 'parent';

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function isUserRole(value: unknown): value is UserRole {
  return value === 'admin' || value === 'teacher' || value === 'parent';
}

function errorResponse(message: string, status: number): Response {
  return Response.json({ error: message }, { status });
}

export default {
  fetch: withSupabase({ auth: 'user' }, async (request, context) => {
    if (request.method !== 'POST') return errorResponse('Method not allowed.', 405);

    try {
      const callerId = context.userClaims?.id;
      if (typeof callerId !== 'string' || !callerId) {
        return errorResponse('Authentication required.', 401);
      }

      const admin = context.supabaseAdmin;
      const rootAdminEmail = (Deno.env.get('ROOT_ADMIN_EMAIL') || 'admin@tieuhoc.edu.vn').trim().toLowerCase();
      const { data: caller, error: callerError } = await admin
        .from('users')
        .select('role')
        .eq('id', callerId)
        .maybeSingle();
      if (callerError) return errorResponse('Could not verify administrator role.', 500);
      if (caller?.role !== 'admin') return errorResponse('Administrator access required.', 403);

      const rawBody: unknown = await request.json();
      if (!isRecord(rawBody) || typeof rawBody.action !== 'string') {
        return errorResponse('Invalid request body.', 400);
      }

      if (rawBody.action === 'create') {
        const email = typeof rawBody.email === 'string' ? rawBody.email.trim().toLowerCase() : '';
        const fullName = typeof rawBody.full_name === 'string' ? rawBody.full_name.trim() : '';
        const role = rawBody.role;
        const phoneNumber = typeof rawBody.phone_number === 'string' ? rawBody.phone_number.trim() : '';
        const schoolName = typeof rawBody.school_name === 'string' ? rawBody.school_name.trim() : '';

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
          return errorResponse('A valid email address is required.', 400);
        }
        if (!fullName || fullName.length > 160 || !isUserRole(role)) {
          return errorResponse('A name and valid user role are required.', 400);
        }

        const { data: existingProfile, error: existingError } = await admin
          .from('users')
          .select('id')
          .eq('email', email)
          .maybeSingle();
        if (existingError) return errorResponse('Could not check for an existing account.', 500);
        if (existingProfile) return errorResponse('An account with this email already exists.', 409);

        const { data: invited, error: inviteError } = await admin.auth.admin.inviteUserByEmail(email, {
          data: { full_name: fullName },
        });
        if (inviteError || !invited.user) {
          return errorResponse(inviteError?.message || 'Could not create the Auth invitation.', 400);
        }

        const { data: profile, error: profileError } = await admin
          .from('users')
          .insert({
            id: invited.user.id,
            email,
            full_name: fullName,
            role,
            phone_number: phoneNumber,
            school_name: schoolName || 'Trường Tiểu học',
          })
          .select('id,email,full_name,role,phone_number,school_name,created_at')
          .single();

        if (profileError || !profile) {
          await admin.auth.admin.deleteUser(invited.user.id);
          return errorResponse('Auth invitation was created, but its profile could not be saved. Retry after checking the database.', 500);
        }

        return Response.json({ user: profile }, { status: 201 });
      }

      if (rawBody.action === 'update') {
        const targetId = typeof rawBody.user_id === 'string' ? rawBody.user_id : '';
        const email = typeof rawBody.email === 'string' ? rawBody.email.trim().toLowerCase() : '';
        const fullName = typeof rawBody.full_name === 'string' ? rawBody.full_name.trim() : '';
        const role = rawBody.role;
        const phoneNumber = typeof rawBody.phone_number === 'string' ? rawBody.phone_number.trim() : '';
        const schoolName = typeof rawBody.school_name === 'string' ? rawBody.school_name.trim() : '';

        if (!targetId) return errorResponse('A user id is required.', 400);
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
          return errorResponse('A valid email address is required.', 400);
        }
        if (!fullName || fullName.length > 160 || !isUserRole(role)) {
          return errorResponse('A name and valid user role are required.', 400);
        }

        const { data: target, error: targetError } = await admin
          .from('users')
          .select('id,email,role')
          .eq('id', targetId)
          .maybeSingle();
        if (targetError) return errorResponse('Could not load the account to update.', 500);
        if (!target) return errorResponse('Account not found.', 404);
        if (targetId === callerId && role !== target.role) {
          return errorResponse('You cannot change your own administrator role.', 403);
        }

        const currentEmail = target.email.trim().toLowerCase();
        const { data: authTarget, error: authTargetError } = await admin.auth.admin.getUserById(targetId);
        if (authTargetError || !authTarget.user) return errorResponse('Could not load the Auth account to update.', 404);
        const authEmail = authTarget.user.email?.trim().toLowerCase() || currentEmail;
        const isRootAdmin = currentEmail === rootAdminEmail || authEmail === rootAdminEmail;
        if (isRootAdmin && (email !== rootAdminEmail || role !== 'admin')) {
          return errorResponse('The root administrator account cannot lose its email or administrator role.', 403);
        }

        const { data: existingProfile, error: existingError } = await admin
          .from('users')
          .select('id')
          .eq('email', email)
          .neq('id', targetId)
          .maybeSingle();
        if (existingError) return errorResponse('Could not check for an existing account.', 500);
        if (existingProfile) return errorResponse('An account with this email already exists.', 409);

        if (target.role === 'admin' && role !== 'admin') {
          const { count, error: countError } = await admin
            .from('users')
            .select('id', { count: 'exact', head: true })
            .eq('role', 'admin');
          if (countError) return errorResponse('Could not verify the remaining administrators.', 500);
          if ((count ?? 0) <= 1) return errorResponse('The last administrator account cannot be demoted.', 409);
        }

        if (email !== authEmail) {
          const { error: authUpdateError } = await admin.auth.admin.updateUserById(targetId, { email });
          if (authUpdateError) return errorResponse(authUpdateError.message, 400);
        }

        const { data: profile, error: profileError } = await admin
          .from('users')
          .update({
            email,
            full_name: fullName,
            role,
            phone_number: phoneNumber,
            school_name: schoolName || 'Trường Tiểu học',
          })
          .eq('id', targetId)
          .select('id,email,full_name,role,phone_number,school_name,created_at')
          .single();

        if (profileError || !profile) {
          if (email !== authEmail) {
            const { error: rollbackError } = await admin.auth.admin.updateUserById(targetId, { email: authTarget.user.email || target.email });
            if (rollbackError) console.error('[admin-users] Could not roll back Auth email after profile update failure:', rollbackError);
          }
          return errorResponse('Auth was updated, but the application profile could not be saved.', 500);
        }

        return Response.json({ user: profile });
      }

      if (rawBody.action === 'delete') {
        const targetId = typeof rawBody.user_id === 'string' ? rawBody.user_id : '';
        if (!targetId) return errorResponse('A user id is required.', 400);
        if (targetId === callerId) return errorResponse('You cannot delete the account currently in use.', 400);

        const { data: target, error: targetError } = await admin
          .from('users')
          .select('id,email,role')
          .eq('id', targetId)
          .maybeSingle();
        if (targetError) return errorResponse('Could not load the account to delete.', 500);
        if (!target) return errorResponse('Account not found.', 404);

        const { data: authTarget, error: authTargetError } = await admin.auth.admin.getUserById(targetId);
        if (authTargetError) return errorResponse('Could not verify the Auth account to delete.', 500);
        if (
          target.email.trim().toLowerCase() === rootAdminEmail
          || authTarget.user?.email?.trim().toLowerCase() === rootAdminEmail
        ) {
          return errorResponse('The root administrator account cannot be deleted.', 403);
        }

        if (target.role === 'admin') {
          const { count, error: countError } = await admin
            .from('users')
            .select('id', { count: 'exact', head: true })
            .eq('role', 'admin');
          if (countError) return errorResponse('Could not verify the remaining administrators.', 500);
          if ((count ?? 0) <= 1) return errorResponse('The last administrator account cannot be deleted.', 409);
        }

        const { error: authDeleteError } = await admin.auth.admin.deleteUser(targetId);
        if (authDeleteError) return errorResponse(authDeleteError.message, 400);

        const { error: profileDeleteError } = await admin.from('users').delete().eq('id', targetId);
        if (profileDeleteError) {
          return errorResponse('Auth account was deleted, but its application profile could not be removed.', 500);
        }
        return Response.json({ success: true });
      }

      return errorResponse('Unsupported action.', 400);
    } catch (error) {
      console.error('[admin-users] Request failed:', error);
      return errorResponse('The account operation failed.', 500);
    }
  }),
};
