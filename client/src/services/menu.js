export async function getLeftMenuData() {
  return [
    {
      title: 'Home',
      key: 'dashboardAlpha',
      url: '/dashboard/alpha',
      icon: 'icmn icmn-home',
    },
    {
      divider: true,
    },
    {
      title: 'Realtime',
      key: 'realtime',
      icon: 'icmn icmn-menu',
      children: [
        {
          key: 'e1',
          title: 'Example1',
          url: '/dashboard/alpha',
          pro: true,
        },
        {
          key: 'e2',
          title: 'Example2',
          url: '/dashboard/alpha',
          pro: true,
        },
      ],
    },
    {
      title: 'Acquisition',
      key: 'acquisition',
      icon: 'icmn icmn-menu',
      children: [
        {
          key: 'e3',
          title: 'Example3',
          url: '/dashboard/alpha',
          pro: true,
        },
        {
          key: 'e4',
          title: 'Example4',
          url: '/dashboard/alpha',
          pro: true,
        },
      ],
    },
    {
      title: 'Behavior',
      key: 'behavior',
      icon: 'icmn icmn-menu',
      children: [
        {
          key: 'e3',
          title: 'Example3',
          url: '/dashboard/alpha',
          pro: true,
        },
        {
          key: 'e4',
          title: 'Example4',
          url: '/dashboard/alpha',
          pro: true,
        },
      ],
    },
    {
      title: 'Audience',
      key: 'audience',
      icon: 'icmn icmn-menu',
      children: [
        {
          key: 'e3',
          title: 'Example3',
          url: '/dashboard/alpha',
          pro: true,
        },
        {
          key: 'e4',
          title: 'Example4',
          url: '/dashboard/alpha',
          pro: true,
        },
      ],
    },
    {
      title: 'Setting',
      key: 'setting',
      icon: 'icmn icmn-cog utils__spin-delayed--pseudo-selector',
      children: [
        {
          key: 'e3',
          title: 'Example3',
          url: '/dashboard/alpha',
          pro: true,
        },
        {
          key: 'e4',
          title: 'Example4',
          url: '/dashboard/alpha',
          pro: true,
        },
      ],
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
      title: 'Dashboard Alpha',
      key: 'dashboardAlpha',
      url: '/dashboard/alpha',
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
