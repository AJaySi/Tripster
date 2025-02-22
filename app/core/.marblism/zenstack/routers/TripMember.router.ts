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

        createMany: procedure.input($Schema.TripMemberInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).tripMember.createMany(input as any))),

        create: procedure.input($Schema.TripMemberInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).tripMember.create(input as any))),

        deleteMany: procedure.input($Schema.TripMemberInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).tripMember.deleteMany(input as any))),

        delete: procedure.input($Schema.TripMemberInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).tripMember.delete(input as any))),

        findFirst: procedure.input($Schema.TripMemberInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).tripMember.findFirst(input as any))),

        findMany: procedure.input($Schema.TripMemberInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).tripMember.findMany(input as any))),

        findUnique: procedure.input($Schema.TripMemberInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).tripMember.findUnique(input as any))),

        updateMany: procedure.input($Schema.TripMemberInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).tripMember.updateMany(input as any))),

        update: procedure.input($Schema.TripMemberInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).tripMember.update(input as any))),

        count: procedure.input($Schema.TripMemberInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).tripMember.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.TripMemberCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TripMemberCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TripMemberCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TripMemberCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.TripMemberCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TripMemberCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TripMemberGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TripMemberGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TripMemberCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TripMemberCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TripMemberGetPayload<T>, Context>) => Promise<Prisma.TripMemberGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.TripMemberDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TripMemberDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TripMemberDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TripMemberDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.TripMemberDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TripMemberDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TripMemberGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TripMemberGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TripMemberDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TripMemberDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TripMemberGetPayload<T>, Context>) => Promise<Prisma.TripMemberGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.TripMemberFindFirstArgs, TData = Prisma.TripMemberGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.TripMemberFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.TripMemberGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TripMemberFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.TripMemberFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.TripMemberGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.TripMemberGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.TripMemberFindManyArgs, TData = Array<Prisma.TripMemberGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.TripMemberFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.TripMemberGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TripMemberFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.TripMemberFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.TripMemberGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.TripMemberGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.TripMemberFindUniqueArgs, TData = Prisma.TripMemberGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.TripMemberFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.TripMemberGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TripMemberFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.TripMemberFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.TripMemberGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.TripMemberGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.TripMemberUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TripMemberUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TripMemberUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TripMemberUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.TripMemberUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TripMemberUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TripMemberGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TripMemberGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TripMemberUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TripMemberUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TripMemberGetPayload<T>, Context>) => Promise<Prisma.TripMemberGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.TripMemberCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.TripMemberCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.TripMemberCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.TripMemberCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.TripMemberCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.TripMemberCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.TripMemberCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.TripMemberCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
