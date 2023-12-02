export const supportRoutes = [
  {
    href: "/",
    title: "Home",
  },
  {
    href: "soporte/productos",
    title: "Productos",
  },
  {
    href: "soporte/tickets",
    title: "Tickets",
  },
  {
    href: "soporte/responsables",
    title: "Responsables",
  }
]

export const mainRoutes = [
  {
    href: "/proyectos",
    title: "Proyectos",
  },
  {
    href: "/soporte",
    title: "Soporte",
  }
]

export const supportSideBarItems = [
  {
      title: "Home",
      href: "/",
  },
  {
    title: "Soporte",
    href: "/soporte",
    children: [
      {
        title: "Productos",
        href: "/productos",
      },
      {
          title: "Tickets",
          href: "/tickets",
      },
      {
        title: "Responsables",
        href: "/responsables"
      },
      {
        title: "Clientes",
        href: "/clientes"
      }
    ]
  },
  {
      title: "Proyectos",
      href: "/proyectos",
  }
];

export const projectSideBarItems = [
  {
      title: "Home",
      href: "/",
  },
  {
      title: "Soporte",
      href: "/soporte",
  },
  {
      title: "Proyectos",
      href: "/proyectos",
  }
];

