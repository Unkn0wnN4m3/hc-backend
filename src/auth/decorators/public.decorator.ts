import { SetMetadata } from '@nestjs/common';
import { PUBLIC_KEY } from 'src/const/key-decorator';

export const PublicAccess = () => SetMetadata(PUBLIC_KEY, true);
