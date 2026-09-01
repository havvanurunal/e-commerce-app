export const categoryLabels: Record<string, string> = {
  SKINCARE: 'Skincare',
  MAKEUP: 'Makeup',
  HAIRCARE: 'Haircare',
  FRAGRANCE: 'Fragrance',
};

export const categoryOptions = Object.entries(categoryLabels).map(
  ([value, label]) => ({ value, label })
);
