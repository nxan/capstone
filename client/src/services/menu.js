export async function getLeftMenuData() {
  return [
    {
      title: 'Home',
      key: 'Dashboard',
      url: '/dashboard',
      icon: 'icmn icmn-home',
    },
    {
      divider: true,
    },
    {
      title: 'Realtime',
      key: 'realtime',
      url: '/realtime',
      icon: 'icmn icmn-clock',
    },
    {
      title: 'Acquisition',
      key: 'acquisition',
      url: '/acquisition',
      icon: 'icmn icmn-share2',
    },
    {
      title: 'Behavior',
      key: 'behavior',
      url: '/behaviors',
      icon: 'icmn icmn-stats-dots',
    },
    {
      title: 'Audience',
      key: 'audience',
      url: '/audience',
      icon: 'icmn icmn-user',
    }, 
    {
      title: 'Recoding',
      key: 'recording',
      url: '/recording',
      icon: 'icmn icmn-stats-dots',
    },
    {
      title: 'Setting',
      key: 'setting',
      icon: 'icmn icmn-cog',
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
      title: 'Dashboard',
      key: 'Dashboard',
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
