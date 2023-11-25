// routes
import { paths } from 'src/routes/paths';
// config
import { PATH_AFTER_LOGIN } from 'src/config-global';
// components
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export const navConfig = [
  {
    title: 'ทั่วไป',
    icon: <Iconify icon="solar:home-2-bold-duotone" />,
    path: '/generate/normal',
  },
  {
    title: 'ยี่กี',
    icon: <Iconify icon="solar:home-2-bold-duotone" />,
    path: '/generate/yeekee',
  },
];
