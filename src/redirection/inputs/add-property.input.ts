import { ApiProperty } from '@nestjs/swagger';

export class AddPropertyInput {
  @ApiProperty()
  indexName: string;
  @ApiProperty()
  value: string;
  @ApiProperty()
  subscriptionId?: string;
  @ApiProperty()
  offerId?: string;
  @ApiProperty()
  userEmail?: string;
}
