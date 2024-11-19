"use client";

import React, { useState, useEffect } from "react";

// window.daum 타입 선언
declare global {
  interface Window {
    daum: {
      Postcode: new (options: { oncomplete: (data: PostcodeData) => void }) => { open: () => void };
    };
  }
}

interface PostcodeData {
  zonecode: string; // 우편번호
  roadAddress: string; // 도로명 주소
  jibunAddress: string; // 지번 주소
  userSelectedType: "R" | "J"; // 선택한 주소 유형
}

interface AddressProps {
  onAddressChange: (addressData: { postcode: string; address: string; detailAddress: string }) => void;
}

const Address: React.FC<AddressProps> = ({ onAddressChange }) => {
  const [postcode, setPostcode] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [isDaumReady, setIsDaumReady] = useState(false); // Daum API 준비 상태

  // Daum Postcode API가 로드되었는지 확인
  useEffect(() => {
    if (typeof window !== "undefined" && window.daum?.Postcode) {
      setIsDaumReady(true); // Daum API 준비 완료
    }
  }, []);

  const handleAddressSearch = () => {
    if (!isDaumReady) {
      alert("주소 검색 기능을 사용할 수 없습니다. 페이지를 새로고침 해주세요.");
      return;
    }

    // 안전하게 Postcode 객체 생성 및 open 호출
    const postcode = new window.daum.Postcode({
      oncomplete: (data: PostcodeData) => {
        const selectedAddress =
          data.userSelectedType === "R" ? data.roadAddress : data.jibunAddress;

        setPostcode(data.zonecode);
        setAddress(selectedAddress);
        onAddressChange({
          postcode: data.zonecode,
          address: selectedAddress,
          detailAddress,
        });

        // 상세 주소 입력 필드로 포커스 이동
        document.getElementById("detailAddress")?.focus();
      },
    });

    // Postcode 객체의 open 메서드 호출
    postcode.open();
  };

  const handleDetailAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDetailAddress = e.target.value;
    setDetailAddress(newDetailAddress);
    onAddressChange({ postcode, address, detailAddress: newDetailAddress });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* 우편번호 입력 및 검색 */}
      <div className="flex gap-2">
        <input
          type="text"
          id="postcode"
          value={postcode}
          readOnly
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          placeholder="우편번호"
        />
        <button
          type="button"
          onClick={handleAddressSearch}
          className="flex h-10 w-full item-center ml-auto justify-center gap-2 px-3 py-2 bg-black rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          검색
        </button>
      </div>

      {/* 기본 주소 */}
      <input
        type="text"
        id="address"
        value={address}
        readOnly
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        placeholder="도로명/지번 주소"
      />

      {/* 상세 주소 */}
      <input
        type="text"
        id="detailAddress"
        value={detailAddress}
        onChange={handleDetailAddressChange}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        placeholder="상세 주소"
      />
    </div>
  );
};

export default Address;
