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

        createMany: procedure.input($Schema.TripActivityInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).tripActivity.createMany(input as any))),

        create: procedure.input($Schema.TripActivityInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).tripActivity.create(input as any))),

        deleteMany: procedure.input($Schema.TripActivityInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).tripActivity.deleteMany(input as any))),

        delete: procedure.input($Schema.TripActivityInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).tripActivity.delete(input as any))),

        findFirst: procedure.input($Schema.TripActivityInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).tripActivity.findFirst(input as any))),

        findMany: procedure.input($Schema.TripActivityInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).tripActivity.findMany(input as any))),

        findUnique: procedure.input($Schema.TripActivityInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).tripActivity.findUnique(input as any))),

        updateMany: procedure.input($Schema.TripActivityInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).tripActivity.updateMany(input as any))),

        update: procedure.input($Schema.TripActivityInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).tripActivity.update(input as any))),

        count: procedure.input($Schema.TripActivityInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).tripActivity.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.TripActivityCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TripActivityCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TripActivityCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TripActivityCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.TripActivityCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TripActivityCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TripActivityGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TripActivityGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TripActivityCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TripActivityCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TripActivityGetPayload<T>, Context>) => Promise<Prisma.TripActivityGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.TripActivityDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TripActivityDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TripActivityDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TripActivityDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.TripActivityDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TripActivityDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TripActivityGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TripActivityGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TripActivityDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TripActivityDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TripActivityGetPayload<T>, Context>) => Promise<Prisma.TripActivityGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.TripActivityFindFirstArgs, TData = Prisma.TripActivityGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.TripActivityFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.TripActivityGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TripActivityFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.TripActivityFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.TripActivityGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.TripActivityGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.TripActivityFindManyArgs, TData = Array<Prisma.TripActivityGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.TripActivityFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.TripActivityGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TripActivityFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.TripActivityFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.TripActivityGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.TripActivityGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.TripActivityFindUniqueArgs, TData = Prisma.TripActivityGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.TripActivityFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.TripActivityGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TripActivityFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.TripActivityFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.TripActivityGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.TripActivityGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.TripActivityUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TripActivityUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TripActivityUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TripActivityUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.TripActivityUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TripActivityUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TripActivityGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TripActivityGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TripActivityUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TripActivityUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TripActivityGetPayload<T>, Context>) => Promise<Prisma.TripActivityGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.TripActivityCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.TripActivityCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.TripActivityCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.TripActivityCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.TripActivityCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.TripActivityCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.TripActivityCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.TripActivityCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
