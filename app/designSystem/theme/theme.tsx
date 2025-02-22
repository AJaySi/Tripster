import { theme } from 'antd'

export const Theme = {
  algorithm: theme.darkAlgorithm,
  token: {
    // Colors
    colorPrimary: '#00a1ec',
    colorError: '#ff4d4f',
    colorInfo: '#1677ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorTextBase: 'white',
    colorLink: '#00a1ec',
    colorBgBase: 'black',
    colorBgContainer: 'black',
    colorBorder: '#3f3f45',
    colorBorderSecondary: '#27272a',
    colorSplit: 'rgba(255, 255, 255, 0.07)',

    // Gradient Blues
    colorGradientBlue1: '#0066cc',
    colorGradientBlue2: '#0099ff',
    colorGradientBlue3: '#00ccff',

    // Gradient Browns
    colorMetallicBrown1: '#8B4513',
    colorMetallicBrown2: '#A0522D',
    colorMetallicBrown3: '#CD853F',
    '--colorMetallicBrown1': '#8B4513',
    '--colorMetallicBrown3': '#CD853F',

    // Gradient Grays
    colorMetallicGray1: '#808080',
    colorMetallicGray2: '#A9A9A9',
    colorMetallicGray3: '#C0C0C0',
    '--colorMetallicGray1': '#808080',
    '--colorMetallicGray3': '#C0C0C0',

    // Warm Gradients
    colorWarmGradient1: '#ffc7b9',
    colorWarmGradient2: '#ffe4d1',
    '--colorWarmGradient1': '#ffc7b9',
    '--colorWarmGradient2': '#ffe4d1',

    // Fresh Gradients
    colorGradientFresh1: '#4CAF50',
    colorGradientFresh2: '#009688',
    colorGradientFresh3: '#2196F3',
    '--colorGradientFresh1': '#4CAF50',
    '--colorGradientFresh2': '#009688',
    '--colorGradientFresh3': '#2196F3',

    // Luxury Gradients
    colorGradientLuxury1: '#4B0082',
    colorGradientLuxury2: '#800080',
    colorGradientLuxury3: '#FF69B4',
    '--colorGradientLuxury1': '#4B0082',
    '--colorGradientLuxury2': '#800080',
    '--colorGradientLuxury3': '#FF69B4',

    // Typography
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial`,
    fontSize: 14,
    fontSizeHeading1: 38,
    fontSizeHeading2: 30,
    fontSizeHeading3: 24,
    linkDecoration: 'underline',

    //Form
    controlItemBgActive: '#27272a',
    controlOutline: 'rgba(255, 255, 255, 0.15)',
    controlHeight: 36,
    controlHeightSM: 32,

    // Layout
    padding: 16,
    boxShadow:
      '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
    boxShadowPrimary:
      '0 8px 20px 0 rgba(0, 161, 236, 0.15), 0 4px 8px -4px rgba(0, 161, 236, 0.25)',
    boxShadowSecondary:
      '0 4px 12px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -2px rgba(0, 0, 0, 0.08)',

    borderRadius: 6,
    lineType: 'solid',
    lineWidth: 1,
    motion: false,

    // Card Styling
    '--cardBorderRadius': '12px',
    '--cardBoxShadow': '0 4px 12px rgba(0, 0, 0, 0.15)',
    '--cardHoverTransform': 'translateY(-2px)',
    '--cardTransition': 'all 0.3s ease',
  },
  components: {
    Form: {
      itemMarginBottom: '22px',
    },
    Layout: {
      headerBg: 'black', // topBar background color
      footerBg: 'black', // footer background color
      siderBg: 'black', // leftBar background color
      siderBorderRight: '1px solid #27272a', // leftBar border right
      headerBorderBottom: '1px solid #27272a', // topBar border bottom
    },
    Menu: {
      activeBarBorderWidth: 0,
      itemHeight: 30,
      //topbar menu items
      horizontalItemSelectedColor: 'white',
      horizontalItemSelectedBg: 'transparent',
      //leftbar menu items
      itemSelectedColor: 'white',
      itemSelectedBg: 'transparent',
      itemActiveBg: 'transparent',
      //topbar and leftbar menu items
      itemHoverColor: 'white',
      itemHoverBg: 'transparent',
      itemColor: '#909090',
      itemBg: 'transparent',
      iconMarginInlineEnd: 8,
      iconSize: 16,
    },
    Button: {
      paddingInlineSM: 13,
      height: 43,
      fontSize: 17,
      colorTextLightSolid: 'black',
      primaryColor: 'black',
      fontWeight: 500,
    },
  },
}
