import { lazy } from "react";

/**
 * Objects of routes to determine correct component to load based on URL.
 *
 * @property {JSX.Element} component React component to render.
 * @property {boolean} exact When true, will only match if the path matches the location.pathname exactly.
 * @property {string} label A name used for react `key` prop.
 * @property {string} path Any valid URL path.
 *
 */
const routes = [
  {
    component: lazy(() =>
      import("./pages/SchoolManagement/SchoolManagement.jsx")
    ),
    label: "school management",
    path: "/school-management",
    title: "school management"
  },
  {
    component: lazy(() => import("./pages/Login/Login")),
    label: "login",
    path: "/login",
    title: "Login",
    disableNavbar: true
  },
  {
    component: lazy(() =>
      import("./pages/Capabilities/Capabilities")
    ),
    label: "Capabilities",
    path: "/capabilities",
    title: "Capabilities"
  },
  {
    component: lazy(() => import("./pages/Schema/Schema.jsx")),
    label: "Schema",
    path: "/schema",
    title: "Schema"
  },
  {
    component: lazy(() => import("./pages/Capability/Capability")),
    label: "Capability",
    path: "/capability",
    title: "Capability"
  },
  {
    component: lazy(() =>
      import("./pages/SubCapability/SubCapability")
    ),
    label: "Sub Capability",
    path: "/sub-capability",
    title: "Sub Capability"
  },
  {
    component: lazy(() => import("./pages/Indicator/Indicator")),
    label: "Indicator",
    path: "/indicator",
    title: "Indicator"
  },
  {
    component: lazy(() => import("./pages/Rubric/Rubric")),
    label: "Rubric",
    path: "/rubric",
    title: "Rubric"
  },
  {
    component: lazy(() =>
      import("./pages/CreateSchool/CreateSchool")
    ),
    label: "Create School",
    path: "/create-school",
    title: "Create School"
  },
  {
    component: lazy(() =>
      import("./pages/AddSchoolStudents/AddSchoolStudents")
    ),
    label: "Add School Students",
    path: "/add-school-students",
    title: "Add School Students"
  },
  {
    component: lazy(() =>
      import("./pages/CreateSurvey/CreateSurvey")
    ),
    label: "Create Survey",
    path: "/create-survey",
    title: "Create Survey"
  },
  {
    component: lazy(() => import("./pages/Survey/Survey")),
    label: "Survey",
    path: "/survey",
    title: "Survey"
  },
  {
    component: lazy(() => import("./pages/Questions/Questions")),
    label: "Questions",
    path: "/questions",
    title: "Questions"
  }
];

export default routes;
