import {
  IconBold,
  IconItalic,
  IconUnderline,
  IconCode,
  IconH1,
  IconH2,
  IconH3,
  IconH4,
  IconH5,
  IconH6,
} from '@tabler/icons-react';
import { IconProps } from '../types/icon';

function getIcon(icon: string) {
  switch (icon) {
    case 'bold':
      return <IconBold />;
    case 'italic':
      return <IconItalic />;
    case 'underline':
      return <IconUnderline />;
    case 'code':
      return <IconCode />;
    case 'heading-one':
      return <IconH1 />;
    case 'heading-two':
      return <IconH2 />;
    case 'heading-three':
      return <IconH3 />;
    case 'heading-four':
      return <IconH4 />;
    case 'heading-five':
      return <IconH5 />;
    case 'heading-six':
      return <IconH6 />;
    default:
      return null;
  }
}

export default function Icon({ icon }: IconProps) {
  return getIcon(icon);
}
