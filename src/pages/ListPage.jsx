import React, { useEffect, useState } from "react";
import axios from "axios";

function ListPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // 버튼 눌렀을 때 상태 바꾸기
  const onClick = () => {
    setItems([{ id: 1, name: "새 아이템" }]);
  };

  // 컴포넌트가 화면에 처음 렌더링 될 때 실행
  useEffect(() => {
    axios
      .get("/data.json") // public 폴더에 있는 data.json 호출
      .then((res) => {
        setItems(res.data); // 받은 데이터를 상태에 저장
        setLoading(false); // 로딩 끝났다고 표시
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>로딩중...</div>;

  return (
    <div>
      <button onClick={onClick}>아이템 추가</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListPage;
