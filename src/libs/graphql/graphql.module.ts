import {DynamicModule, Module} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo';

@Module({})
export class GraphQLAppModule {
  public static forRoot(): DynamicModule {
    return {
      module: GraphQLAppModule,
      imports: [
         GraphQLModule.forRoot<ApolloDriverConfig>({
           driver: ApolloDriver,
           autoSchemaFile: true,
           context: ({req}) => ({req})
         }),
      ],
      providers: [],
      exports: []
    };
  }
}
