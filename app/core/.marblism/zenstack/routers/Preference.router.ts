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

        createMany: procedure.input($Schema.PreferenceInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).preference.createMany(input as any))),

        create: procedure.input($Schema.PreferenceInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).preference.create(input as any))),

        deleteMany: procedure.input($Schema.PreferenceInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).preference.deleteMany(input as any))),

        delete: procedure.input($Schema.PreferenceInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).preference.delete(input as any))),

        findFirst: procedure.input($Schema.PreferenceInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).preference.findFirst(input as any))),

        findMany: procedure.input($Schema.PreferenceInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).preference.findMany(input as any))),

        findUnique: procedure.input($Schema.PreferenceInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).preference.findUnique(input as any))),

        updateMany: procedure.input($Schema.PreferenceInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).preference.updateMany(input as any))),

        update: procedure.input($Schema.PreferenceInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).preference.update(input as any))),

        count: procedure.input($Schema.PreferenceInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).preference.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.PreferenceCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PreferenceCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PreferenceCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PreferenceCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.PreferenceCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PreferenceCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.PreferenceGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.PreferenceGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PreferenceCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PreferenceCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.PreferenceGetPayload<T>, Context>) => Promise<Prisma.PreferenceGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.PreferenceDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PreferenceDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PreferenceDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PreferenceDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.PreferenceDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PreferenceDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.PreferenceGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.PreferenceGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PreferenceDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PreferenceDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.PreferenceGetPayload<T>, Context>) => Promise<Prisma.PreferenceGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.PreferenceFindFirstArgs, TData = Prisma.PreferenceGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.PreferenceFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.PreferenceGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.PreferenceFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.PreferenceFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.PreferenceGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.PreferenceGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.PreferenceFindManyArgs, TData = Array<Prisma.PreferenceGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.PreferenceFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.PreferenceGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.PreferenceFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.PreferenceFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.PreferenceGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.PreferenceGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.PreferenceFindUniqueArgs, TData = Prisma.PreferenceGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.PreferenceFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.PreferenceGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.PreferenceFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.PreferenceFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.PreferenceGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.PreferenceGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.PreferenceUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PreferenceUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PreferenceUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PreferenceUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.PreferenceUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.PreferenceUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.PreferenceGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.PreferenceGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.PreferenceUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.PreferenceUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.PreferenceGetPayload<T>, Context>) => Promise<Prisma.PreferenceGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.PreferenceCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.PreferenceCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.PreferenceCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.PreferenceCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.PreferenceCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.PreferenceCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.PreferenceCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.PreferenceCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
