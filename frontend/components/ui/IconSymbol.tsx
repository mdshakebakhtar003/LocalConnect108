import { Platform } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SFSymbol, SymbolWeight, SymbolViewProps } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, StyleProp, TextStyle } from 'react-native';

type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * Keys are SF Symbols (iOS), values are MaterialIcons (Android/Web)
 * Reference: https://icons.expo.fyi/
 */
const MAPPING = {
  'rectangle.grid.2x2.fill': 'grid-view',       // Home
  'magnifyingglass.circle.fill': 'search',      // Search
  'person.crop.circle.fill': 'person',          // Profile
  'chart.bar.xaxis': 'bar-chart',               // Dashboard
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
} as IconMapping;

/**
 * A universal icon component that uses native SF Symbols on iOS
 * and Material Icons on Android and Web.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  const mappedName = MAPPING[name];

  if (!mappedName) {
    console.warn(`[IconSymbol] '${name}' is not mapped. Showing fallback icon.`);
  }

  if (Platform.OS === 'ios') {
    return <SFSymbol name={name} size={size} color={color} weight={weight} style={style} />;
  }

  return (
    <MaterialIcons
      name={mappedName ?? 'help-outline'}
      size={size}
      color={color}
      style={style}
    />
  );
}
