import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from "graphql";
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } &
  { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Timestamp: any;
  Decimal: any;
  Date: any;
};

export type Loan = {
  __typename?: "Loan";
  id: Scalars["ID"];
  properties?: Maybe<Array<Property>>;
  valuation: Scalars["Decimal"];
  principal: Scalars["Decimal"];
  interest: Scalars["Decimal"];
  createdAt: Scalars["Timestamp"];
  updatedAt: Scalars["Timestamp"];
};

export type LoanRequest = {
  properties?: Maybe<Array<PropertyRequest>>;
  valuation: Scalars["Decimal"];
  principal: Scalars["Decimal"];
  interest: Scalars["Decimal"];
};

export type LoanResponse = {
  __typename?: "LoanResponse";
  errors?: Maybe<Array<Scalars["String"]>>;
  loan?: Maybe<Loan>;
};

export type Mutation = {
  __typename?: "Mutation";
  addLoan: LoanResponse;
  removeLoan: LoanResponse;
  updateLoan: LoanResponse;
};

export type MutationAddLoanArgs = {
  request: LoanRequest;
};

export type MutationRemoveLoanArgs = {
  loanId: Scalars["ID"];
};

export type MutationUpdateLoanArgs = {
  loanId: Scalars["ID"];
  request: LoanRequest;
};

export type Property = {
  __typename?: "Property";
  id: Scalars["ID"];
  address1: Scalars["String"];
  address2: Scalars["String"];
  city: Scalars["String"];
  state: Scalars["String"];
  zip: Scalars["String"];
  loans: Array<Loan>;
  createdAt: Scalars["Timestamp"];
  updatedAt: Scalars["Timestamp"];
};

export type PropertyRequest = {
  address1: Scalars["String"];
  address2: Scalars["String"];
  city: Scalars["String"];
  state: Scalars["String"];
  zip: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  getLoans: Array<Loan>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (
  obj: T,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  Loan: ResolverTypeWrapper<Loan>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  Property: ResolverTypeWrapper<Property>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Timestamp: ResolverTypeWrapper<Scalars["Timestamp"]>;
  Decimal: ResolverTypeWrapper<Scalars["Decimal"]>;
  Mutation: ResolverTypeWrapper<{}>;
  LoanRequest: LoanRequest;
  PropertyRequest: PropertyRequest;
  LoanResponse: ResolverTypeWrapper<LoanResponse>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Date: ResolverTypeWrapper<Scalars["Date"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  Loan: Loan;
  ID: Scalars["ID"];
  Property: Property;
  String: Scalars["String"];
  Timestamp: Scalars["Timestamp"];
  Decimal: Scalars["Decimal"];
  Mutation: {};
  LoanRequest: LoanRequest;
  PropertyRequest: PropertyRequest;
  LoanResponse: LoanResponse;
  Boolean: Scalars["Boolean"];
  Date: Scalars["Date"];
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
  name: "Date";
}

export interface DecimalScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Decimal"], any> {
  name: "Decimal";
}

export type LoanResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Loan"] = ResolversParentTypes["Loan"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  properties?: Resolver<Maybe<Array<ResolversTypes["Property"]>>, ParentType, ContextType>;
  valuation?: Resolver<ResolversTypes["Decimal"], ParentType, ContextType>;
  principal?: Resolver<ResolversTypes["Decimal"], ParentType, ContextType>;
  interest?: Resolver<ResolversTypes["Decimal"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["Timestamp"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["Timestamp"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type LoanResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["LoanResponse"] = ResolversParentTypes["LoanResponse"]
> = {
  errors?: Resolver<Maybe<Array<ResolversTypes["String"]>>, ParentType, ContextType>;
  loan?: Resolver<Maybe<ResolversTypes["Loan"]>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  addLoan?: Resolver<
    ResolversTypes["LoanResponse"],
    ParentType,
    ContextType,
    RequireFields<MutationAddLoanArgs, "request">
  >;
  removeLoan?: Resolver<
    ResolversTypes["LoanResponse"],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveLoanArgs, "loanId">
  >;
  updateLoan?: Resolver<
    ResolversTypes["LoanResponse"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateLoanArgs, "loanId" | "request">
  >;
};

export type PropertyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Property"] = ResolversParentTypes["Property"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  address1?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  address2?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  city?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  state?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  zip?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  loans?: Resolver<Array<ResolversTypes["Loan"]>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["Timestamp"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["Timestamp"], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  getLoans?: Resolver<Array<ResolversTypes["Loan"]>, ParentType, ContextType>;
};

export interface TimestampScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Timestamp"], any> {
  name: "Timestamp";
}

export type Resolvers<ContextType = any> = {
  Date?: GraphQLScalarType;
  Decimal?: GraphQLScalarType;
  Loan?: LoanResolvers<ContextType>;
  LoanResponse?: LoanResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Property?: PropertyResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Timestamp?: GraphQLScalarType;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
