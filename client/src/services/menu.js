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
      title: 'Real Time',
      key: 'realtime',
      url: '/realtime',
      icon: 'icmn icmn-feed',
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
      url: '/behavior',
      icon: 'icmn icmn-opt',
    },
    {
      title: 'Statistic',
      key: 'audience',
      url: '/audience',
      icon: 'icmn icmn-users',
    }, 
    {
      title: 'Recoding',
      key: 'recording',
      url: '/recording',
      icon: 'icmn icmn-film',
    }, 
    {
      title: 'Heat Map',
      key: 'heatmap',
      url: '/heatmap',
      icon: 'icmn icmn-fire',
    },
    {
      title: 'Suggest',
      key: 'suggest',
      url: '/suggest',
      icon: 'icmn icmn-magic-wand',
    },
    {
      title: 'Profile',
      key: 'profile',
      url: '/profile',
      icon: 'fa fa-user',
    },
    {
      title: 'Setting',
      key: 'setting',
      url: '/settings',
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
