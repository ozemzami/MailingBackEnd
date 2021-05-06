import { ApiProperty } from '@nestjs/swagger';

export class AddOfferInput {
  @ApiProperty()
  name: string;
  @ApiProperty()
  link: string;
  @ApiProperty()
  unsub: string;
}
