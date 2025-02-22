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

        createMany: procedure.input($Schema.TripInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).trip.createMany(input as any))),

        create: procedure.input($Schema.TripInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).trip.create(input as any))),

        deleteMany: procedure.input($Schema.TripInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).trip.deleteMany(input as any))),

        delete: procedure.input($Schema.TripInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).trip.delete(input as any))),

        findFirst: procedure.input($Schema.TripInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).trip.findFirst(input as any))),

        findMany: procedure.input($Schema.TripInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).trip.findMany(input as any))),

        findUnique: procedure.input($Schema.TripInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).trip.findUnique(input as any))),

        updateMany: procedure.input($Schema.TripInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).trip.updateMany(input as any))),

        update: procedure.input($Schema.TripInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).trip.update(input as any))),

        count: procedure.input($Schema.TripInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).trip.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.TripCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TripCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TripCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TripCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.TripCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TripCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TripGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TripGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TripCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TripCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TripGetPayload<T>, Context>) => Promise<Prisma.TripGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.TripDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TripDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TripDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TripDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.TripDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TripDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TripGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TripGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TripDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TripDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TripGetPayload<T>, Context>) => Promise<Prisma.TripGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.TripFindFirstArgs, TData = Prisma.TripGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.TripFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.TripGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TripFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.TripFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.TripGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.TripGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.TripFindManyArgs, TData = Array<Prisma.TripGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.TripFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.TripGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TripFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.TripFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.TripGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.TripGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.TripFindUniqueArgs, TData = Prisma.TripGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.TripFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.TripGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TripFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.TripFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.TripGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.TripGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.TripUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TripUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TripUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TripUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.TripUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TripUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TripGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TripGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TripUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TripUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TripGetPayload<T>, Context>) => Promise<Prisma.TripGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.TripCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.TripCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.TripCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.TripCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.TripCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.TripCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.TripCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.TripCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
