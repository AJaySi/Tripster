/* eslint-disable */
import type { unsetMarker, AnyRouter, AnyRootConfig, CreateRouterInner, Procedure, ProcedureBuilder, ProcedureParams, ProcedureRouterRecord, ProcedureType } from "@trpc/server";
import type { PrismaClient } from "@zenstackhq/runtime/models";
import createUserRouter from "./User.router";
import createTripRouter from "./Trip.router";
import createTripMemberRouter from "./TripMember.router";
import createTripActivityRouter from "./TripActivity.router";
import createExpenseRouter from "./Expense.router";
import createPreferenceRouter from "./Preference.router";
import createJournalRouter from "./Journal.router";
import createDocumentRouter from "./Document.router";
import createOrganizationRouter from "./Organization.router";
import createOrganizationRoleRouter from "./OrganizationRole.router";
import createPreferenceTemplateRouter from "./PreferenceTemplate.router";
import { ClientType as UserClientType } from "./User.router";
import { ClientType as TripClientType } from "./Trip.router";
import { ClientType as TripMemberClientType } from "./TripMember.router";
import { ClientType as TripActivityClientType } from "./TripActivity.router";
import { ClientType as ExpenseClientType } from "./Expense.router";
import { ClientType as PreferenceClientType } from "./Preference.router";
import { ClientType as JournalClientType } from "./Journal.router";
import { ClientType as DocumentClientType } from "./Document.router";
import { ClientType as OrganizationClientType } from "./Organization.router";
import { ClientType as OrganizationRoleClientType } from "./OrganizationRole.router";
import { ClientType as PreferenceTemplateClientType } from "./PreferenceTemplate.router";

export type BaseConfig = AnyRootConfig;

export type RouterFactory<Config extends BaseConfig> = <
    ProcRouterRecord extends ProcedureRouterRecord
>(
    procedures: ProcRouterRecord
) => CreateRouterInner<Config, ProcRouterRecord>;

export type UnsetMarker = typeof unsetMarker;

export type ProcBuilder<Config extends BaseConfig> = ProcedureBuilder<
    ProcedureParams<Config, any, any, any, UnsetMarker, UnsetMarker, any>
>;

export function db(ctx: any) {
    if (!ctx.prisma) {
        throw new Error('Missing "prisma" field in trpc context');
    }
    return ctx.prisma as PrismaClient;
}

export function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({
        user: createUserRouter(router, procedure),
        trip: createTripRouter(router, procedure),
        tripMember: createTripMemberRouter(router, procedure),
        tripActivity: createTripActivityRouter(router, procedure),
        expense: createExpenseRouter(router, procedure),
        preference: createPreferenceRouter(router, procedure),
        journal: createJournalRouter(router, procedure),
        document: createDocumentRouter(router, procedure),
        organization: createOrganizationRouter(router, procedure),
        organizationRole: createOrganizationRoleRouter(router, procedure),
        preferenceTemplate: createPreferenceTemplateRouter(router, procedure),
    }
    );
}

export interface ClientType<AppRouter extends AnyRouter> {
    user: UserClientType<AppRouter>;
    trip: TripClientType<AppRouter>;
    tripMember: TripMemberClientType<AppRouter>;
    tripActivity: TripActivityClientType<AppRouter>;
    expense: ExpenseClientType<AppRouter>;
    preference: PreferenceClientType<AppRouter>;
    journal: JournalClientType<AppRouter>;
    document: DocumentClientType<AppRouter>;
    organization: OrganizationClientType<AppRouter>;
    organizationRole: OrganizationRoleClientType<AppRouter>;
    preferenceTemplate: PreferenceTemplateClientType<AppRouter>;
}
