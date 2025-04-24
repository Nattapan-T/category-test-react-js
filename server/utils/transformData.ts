export const transformData = (users: any[]) => {
  const grouped = users.reduce((acc: any, user: any) => {
    const department = user.company.department;

    if (!acc[department]) {
      acc[department] = {
        male: 0,
        female: 0,
        ageMin: user.age,
        ageMax: user.age,
        hair: {},
        addressUser: {},
      };
    }

    const group = acc[department];

    if (user.gender === "male") group.male++;
    if (user.gender === "female") group.female++;

    group.ageMin = Math.min(group.ageMin, user.age);
    group.ageMax = Math.max(group.ageMax, user.age);

    const hairColor = user.hair.color;
    group.hair[hairColor] = (group.hair[hairColor] || 0) + 1;

    const fullName = `${user.firstName}${user.lastName}`;
    group.addressUser[fullName] = String(user.address.postalCode);

    return acc;
  }, {});

  for (const dept in grouped) {
    const group = grouped[dept];
    group.ageRange = `${group.ageMin}-${group.ageMax}`;
    group.ageRange =
      group.ageMin === group.ageMax
        ? `${group.ageMin}`
        : `${group.ageMin}-${group.ageMax}`;
    delete group.ageMin;
    delete group.ageMax;
  }

  return grouped;
};
