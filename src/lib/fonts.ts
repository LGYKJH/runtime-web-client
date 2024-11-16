import localFont from "next/font/local";

const Pretendard = localFont({
  src: "../app/fonts/PretendardVariable.woff2",
});

const SpoqaHanSans = localFont({
  src: [
    {
      path: "../app/fonts/SpoqaHanSansNeo-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../app/fonts/SpoqaHanSansNeo-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../app/fonts/SpoqaHanSansNeo-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../app/fonts/SpoqaHanSansNeo-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../app/fonts/SpoqaHanSansNeo-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

// const nanumSquare = localFont({
//   src: "../app/fonts/NanumSquareNeo-Variable.woff2",
// });

// const Freesentation = localFont({
//   src: "../app/fonts/FreesentationVF.woff2",
// });

// const ibmSans = localFont({
//   src: [
//     {
//       path: "../app/fonts/IBM-sans/IBMPlexSansKR-Thin.woff2",
//       weight: "100",
//       style: "normal",
//     },
//     {
//       path: "../app/fonts/IBM-sans/IBMPlexSansKR-ExtraLight.woff2",
//       weight: "200",
//       style: "normal",
//     },
//     {
//       path: "../app/fonts/IBM-sans/IBMPlexSansKR-Light.woff2",
//       weight: "300",
//       style: "normal",
//     },
//     {
//       path: "../app/fonts/IBM-sans/IBMPlexSansKR-Regular.woff2",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "../app/fonts/IBM-sans/IBMPlexSansKR-Medium.woff2",
//       weight: "500",
//       style: "normal",
//     },
//     {
//       path: "../app/fonts/IBM-sans/IBMPlexSansKR-Bold.woff2",
//       weight: "700",
//       style: "normal",
//     },
//     {
//       path: "../app/fonts/IBM-sans/IBMPlexSansKR-Text.woff2",
//       weight: "600",
//       style: "normal",
//     },
//   ],
// });

// const notoSans = localFont({
//   src: [
//     {
//       path: "../app/fonts/noto-sans/NotoSans-Thin.woff2",
//       weight: "100",
//       style: "normal",
//     },
//     {
//       path: "../app/fonts/noto-sans/NotoSans-Light.woff2",
//       weight: "300",
//       style: "normal",
//     },
//     {
//       path: "../app/fonts/noto-sans/NotoSans-Regular.woff2",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "../app/fonts/noto-sans/NotoSans-Medium.woff2",
//       weight: "500",
//       style: "normal",
//     },
//     {
//       path: "../app/fonts/noto-sans/NotoSans-Bold.woff2",
//       weight: "700",
//       style: "normal",
//     },
//     {
//       path: "../app/fonts/noto-sans/NotoSans-Black.woff2",
//       weight: "900",
//       style: "normal",
//     },
//   ],
// });

export { Pretendard, SpoqaHanSans };
