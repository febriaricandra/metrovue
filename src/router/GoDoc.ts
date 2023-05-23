export default [
    {
        path: "/godoc",
        name: "godoc-dashboard",
        component: () => import("@/views/GoDoc/GoDocDashboard.vue"),
        meta: {
            pageTitle: "GoDoc Dashboard",
            breadcrumbs: ["Layout"]
        }
    },
    // {
    //     path: "godoc/form/",
    //     name: "godoc-form",
    //     component: () => import("@/views/GoDoc/GoDocType.vue"),
    //     meta: {
    //         pageTitle: "Type Document",
    //         breadcrumbs: ["Godoc", "Type"],
    //     },
    // },
    {
        path: "/test/",
        name: "godoc-form",
        component: () => import("@/views/GoDoc/Master/Type/index.vue"),
        meta: {
            pageTitle: "Type Document",
            breadcrumbs: ["Godoc", "Type"],
        },
    },
    {
        path: "/test/create",
        name: "Add Type Document",
        component: () => import("@/views/GoDoc/Master/Type/create.vue"),
        meta: {
            pageTitle: "Create Document",
            breadcrumbs: ["Godoc", "Type", "Create"],
        },
    },
    {
        path: "/test/edit/:id",
        name: "Edit Type Document",
        component: () => import("@/views/GoDoc/Master/Type/edit.vue"),
        meta: {
            pageTitle: "Edit Document",
            breadcrumbs: ["Godoc", "Type", "Edit"],
        },
    },
    {
        path: "/form-document/",
        name: "list-form-document",
        component: () => import("@/views/GoDoc/FormDocument/index.vue"),
        meta: {
            pageTitle: "List Document",
            breadcrumbs: ["Godoc", "Form Document"],
        }
    },
    {
        path: "/form-document/create",
        name: "create-document",
        component: () => import("@/views/GoDoc/FormDocument/create.vue"),
        meta: {
            pageTitle: "Create Document",
            breadcrumbs: ["Godoc", "Form Document", "Create"],
        }
    },
    {
        path: "/form-document/edit/:id",
        name: "edit-document",
        component: () => import("@/views/GoDoc/FormDocument/edit.vue"),
        meta: {
            pageTitle: "Edit Document",
            breadcrumbs: ["Godoc", "Form Document", "Edit"],
        }
    },
    {
        path: "/crafted/pages/wizards/",
        name: "horizontal-wizard",
        component: () => import("@/views/crafted/pages/wizards/Horizontal.vue"),
        meta: {
            pageTitle: "Horizontal",
            breadcrumbs: ["Pages", "Wizard"],
        },
    },
]