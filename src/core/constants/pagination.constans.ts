import { ApiProperty } from '@nestjs/swagger';
import {
    IsIn,
    IsNumberString,
    IsOptional,
    IsString,
} from 'class-validator';

export const sortTypes = ['DESC', 'ASC'];
const pageSizes = ['5','10', '25', '50'];

export const offset = `OFFSET :offset`;
export const limit = `LIMIT :limit`;

export class PaginationDto {
    @ApiProperty({ enum: sortTypes, default: sortTypes[0] })
    @IsOptional()
    @IsIn(sortTypes)
    sortType?: string = sortTypes[0];

    @ApiProperty()
    @IsOptional()
    sortValue?: string = 'updatedAt';

    @ApiProperty({ default: '1' })
    @IsOptional()
    @IsNumberString()
    page?: string = '1';

    @ApiProperty({ enum: pageSizes, default: pageSizes[0] })
    @IsOptional()
    @IsIn(pageSizes)
    pageSize?: string = pageSizes[0];

    @ApiProperty()
    @IsOptional()
    @IsString()
    search?: string = '';
}
