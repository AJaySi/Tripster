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

        createMany: procedure.input($Schema.JournalInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).journal.createMany(input as any))),

        create: procedure.input($Schema.JournalInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).journal.create(input as any))),

        deleteMany: procedure.input($Schema.JournalInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).journal.deleteMany(input as any))),

        delete: procedure.input($Schema.JournalInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).journal.delete(input as any))),

        findFirst: procedure.input($Schema.JournalInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).journal.findFirst(input as any))),

        findMany: procedure.input($Schema.JournalInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).journal.findMany(input as any))),

        findUnique: procedure.input($Schema.JournalInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).journal.findUnique(input as any))),

        updateMany: procedure.input($Schema.JournalInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).journal.updateMany(input as any))),

        update: procedure.input($Schema.JournalInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).journal.update(input as any))),

        count: procedure.input($Schema.JournalInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).journal.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.JournalCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.JournalCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.JournalCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.JournalCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.JournalCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.JournalCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.JournalGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.JournalGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.JournalCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.JournalCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.JournalGetPayload<T>, Context>) => Promise<Prisma.JournalGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.JournalDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.JournalDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.JournalDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.JournalDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.JournalDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.JournalDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.JournalGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.JournalGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.JournalDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.JournalDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.JournalGetPayload<T>, Context>) => Promise<Prisma.JournalGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.JournalFindFirstArgs, TData = Prisma.JournalGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.JournalFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.JournalGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.JournalFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.JournalFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.JournalGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.JournalGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.JournalFindManyArgs, TData = Array<Prisma.JournalGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.JournalFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.JournalGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.JournalFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.JournalFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.JournalGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.JournalGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.JournalFindUniqueArgs, TData = Prisma.JournalGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.JournalFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.JournalGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.JournalFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.JournalFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.JournalGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.JournalGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.JournalUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.JournalUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.JournalUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.JournalUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.JournalUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.JournalUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.JournalGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.JournalGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.JournalUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.JournalUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.JournalGetPayload<T>, Context>) => Promise<Prisma.JournalGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.JournalCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.JournalCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.JournalCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.JournalCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.JournalCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.JournalCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.JournalCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.JournalCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
