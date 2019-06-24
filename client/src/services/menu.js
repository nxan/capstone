export async function getLeftMenuData() {
  return [
    {
      title: 'Home',
      key: 'dashboardAlpha',
      url: '/dashboard',
      icon: 'icmn icmn-home',
    },
    {
      divider: true,
    },
    {
      title: 'Realtime',
      key: 'realtime',
      icon: 'icmn icmn-menu',
    },
    {
      title: 'Acquisition',
      key: 'acquisition',
      icon: 'icmn icmn-menu',
    },
    {
      title: 'Behavior',
      key: 'behavior',
      icon: 'icmn icmn-menu',
    },
    {
      title: 'Audience',
      key: 'audience',
      icon: 'icmn icmn-menu',
    },
    {
      title: 'Setting',
      key: 'setting',
      icon: 'icmn icmn-cog utils__spin-delayed--pseudo-selector',
    },
  ]
}
export async function getTopMenuData() {
  return [
    {
      title: 'Settings',
      key: 'settings',
      icon: 'icmn icmn-cog utils__spin-delayed--pseudo-selector',
    },
    {
      title: 'Docs',
      key: 'documentation',
      url: 'https://docs.cleanuitemplate.com/react/getting-started',
      target: '_blank',
      icon: 'icmn icmn-books',
    },
    {
      title: 'Dashboard',
      key: 'dashboardAlpha',
      url: '/dashboard',
      icon: 'icmn icmn-home',
    },
    {
      title: 'AntDesign',
      key: 'antComponents',
      icon: 'icmn icmn-menu',
      url: '/antd',
    },
  ]
}
