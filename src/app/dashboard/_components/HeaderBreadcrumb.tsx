"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronsRight } from "lucide-react";

const HeaderBreadcrumb = () => {
  const pathname = usePathname();

  // 경로를 '/'로 나눠 배열로 변환
  const segments = pathname.split("/").filter((segment) => segment);

  // 경로 제목 매핑
  const segmentTitles: { [key: string]: string } = {
    dashboard: "보드",
    crew: "크루",
    createCrew: "크루 생성",
  };

  // 숫자를 제외한 세그먼트로 필터링
  const filteredSegments = segments.filter((segment) => isNaN(Number(segment)));

  return (
    <Breadcrumb className="flex items-center gap-x-4">
      {filteredSegments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/"); // 누적 경로 생성
        const isLast = index === filteredSegments.length - 1; // 마지막 경로 여부 확인

        return (
          <React.Fragment key={href}>
            <BreadcrumbItem>
              <BreadcrumbLink
                className={
                  isLast ? "pt-0.5 text-primary" : "pt-0.5 text-secondary"
                }
                href={isLast ? undefined : href}
              >
                {segmentTitles[segment] || segment}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {/* Separator 추가 */}
            {!isLast && (
              <BreadcrumbSeparator className="flex items-center">
                <ChevronsRight className="w-4 h-4" />
              </BreadcrumbSeparator>
            )}
          </React.Fragment>
        );
      })}
    </Breadcrumb>
  );
};

export default HeaderBreadcrumb;
