export const getBreadcrumbLabel = (pathname: string): string => {
  const breadcrumbMap: { [key: string]: string } = {
    members: "أعضاء مجلس الإدارة",
  };

  const pathKey = pathname.split("/").pop() as string;

  return breadcrumbMap[pathKey] || "غير معروف";
};
