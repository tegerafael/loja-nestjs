import { Type } from "class-transformer";
import {
  IsArray,
  IsDecimal,
  IsNotEmpty,
  IsPositive,
  IsInt,
  Min,
  MaxLength,
  ValidateNested,
} from "class-validator";

export class CreateProductDTO {
  @IsNotEmpty({ message: "O nome do produto não pode ser vazio" })
  name: string;

  @IsPositive({ message: "O valor do produto precisa ser um número positivo" })
  @IsDecimal({ decimal_digits: '2' }, { message: "O valor deve ter até duas casas decimais" })
  value: number;

  @IsInt({ message: "A quantidade precisa ser um número inteiro" })
  @Min(0, { message: "A quantidade deve ser igual ou maior que zero" })
  amount: number;

  @IsNotEmpty({ message: "A descrição não pode ser vazia" })
  @MaxLength(1000, { message: "A descrição não pode ter mais de 1000 caracteres" })
  description: string;

  @ValidateNested({ each: true, message: "A lista de características do produto precisa ter pelo menos 3 itens" })
  @IsArray({ message: "A lista de características do produto não pode ser vazia" })
  @Type(() => CharacteristicProductDTO)
  characteristics: CharacteristicProductDTO[];

  @IsArray({ message: "A lista de imagens do produto precisa ter pelo menos 1 item" })
  @Type(() => ImageProductDTO)
  images: ImageProductDTO[];

  @IsNotEmpty({ message: "A categoria do produto não pode ser vazia" })
  category: string;
}

export class CharacteristicProductDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}

export class ImageProductDTO {
  @IsNotEmpty()
  url: string;

  description: string;
}
