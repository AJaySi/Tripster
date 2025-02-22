/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@zenstackhq/runtime/models';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.PreferenceTemplateInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).preferenceTemplate.createMany(input as any))),

        create: procedure.input($Schema.PreferenceTemplateInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).preferenceTemplate.create(input as any))),

        deleteMany: procedure.input($Schema.PreferenceTemplateInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).preferenceTemplate.deleteMany(input as any))),

        delete: procedure.input($Schema.PreferenceTemplateInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).preferenceTemplate.delete(input as any))),

        findFirst: procedure.input($Schema.PreferenceTemplateInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).preferenceTemplate.findFirst(input as any))),

        findMany: procedure.input($Schema.PreferenceTemplateInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).preferenceTemplate.findMany(input as any))),

        findUnique: procedure.input($Schema.PreferenceTemplateInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).preferenceTemplate.findUnique(input as any))),

        updateMany: procedure.input($Schema.PreferenceTemplateInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).preferenceTemplate.updateMany(input as any))),

        update: procedure.input($Schema.PreferenceTemplateInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).preferenceTemplate.update(input as any))),

        count: procedure.input($Schema.PreferenceTemplateInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).preferenceTemplate.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.PreferenceTemplateCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PreferenceTemplateCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PreferenceTemplateCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PreferenceTemplateCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.PreferenceTemplateCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PreferenceTemplateCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.PreferenceTemplateGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.PreferenceTemplateGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PreferenceTemplateCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PreferenceTemplateCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.PreferenceTemplateGetPayload<T>, Context>) => Promise<Prisma.PreferenceTemplateGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.PreferenceTemplateDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PreferenceTemplateDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PreferenceTemplateDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PreferenceTemplateDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.PreferenceTemplateDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PreferenceTemplateDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.PreferenceTemplateGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.PreferenceTemplateGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PreferenceTemplateDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PreferenceTemplateDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.PreferenceTemplateGetPayload<T>, Context>) => Promise<Prisma.PreferenceTemplateGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.PreferenceTemplateFindFirstArgs, TData = Prisma.PreferenceTemplateGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.PreferenceTemplateFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.PreferenceTemplateGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.PreferenceTemplateFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.PreferenceTemplateFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.PreferenceTemplateGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.PreferenceTemplateGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.PreferenceTemplateFindManyArgs, TData = Array<Prisma.PreferenceTemplateGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.PreferenceTemplateFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.PreferenceTemplateGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.PreferenceTemplateFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.PreferenceTemplateFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.PreferenceTemplateGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.PreferenceTemplateGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.PreferenceTemplateFindUniqueArgs, TData = Prisma.PreferenceTemplateGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.PreferenceTemplateFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.PreferenceTemplateGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.PreferenceTemplateFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.PreferenceTemplateFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.PreferenceTemplateGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.PreferenceTemplateGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.PreferenceTemplateUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PreferenceTemplateUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PreferenceTemplateUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PreferenceTemplateUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.PreferenceTemplateUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PreferenceTemplateUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.PreferenceTemplateGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.PreferenceTemplateGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PreferenceTemplateUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PreferenceTemplateUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.PreferenceTemplateGetPayload<T>, Context>) => Promise<Prisma.PreferenceTemplateGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.PreferenceTemplateCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.PreferenceTemplateCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.PreferenceTemplateCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.PreferenceTemplateCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.PreferenceTemplateCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.PreferenceTemplateCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.PreferenceTemplateCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.PreferenceTemplateCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
