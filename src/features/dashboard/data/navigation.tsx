export const weightLossNavigationItems = [
  {
    title: "Home",
    url: "/dashboard",
  },
  {
    title: "Wallet",
    url: "/dashboard/wallet",
    matchUrls: ["/dashboard/wallet", "/dashboard/wallet/transactions"],
   
  },
];

export type NavigationItem = {
  title: string;
  url: string;
  matchUrls?: string[];
};
