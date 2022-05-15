# 그립 컴퍼니 Web Front(React) 개발 사전 과제

- 영화를 검색하고 즐겨찾기로 등록할 수 있는 React 앱을 구현합니다.

---

# 구현 
![image](https://user-images.githubusercontent.com/88325253/168460093-1eb50e7e-d515-4e33-9ded-652254afc48f.png)

## 검색 탭

### 하단 탭 바 구현
- `react-router-dom`의 `route`, `Link`, `NavLink`를 이용해 하단 탭 바를 구현
- 클릭 시 해당 페이지로 넘어가며, 선택된 탭이 활성화가 된 모습을 볼 수 있다.

### 앱 첫 진입 화면
![image](https://user-images.githubusercontent.com/88325253/168460149-4e4fd501-b22c-4aa1-b7ce-457cb216e9dd.png)

### 검색 전 화면
![image](https://user-images.githubusercontent.com/88325253/168460169-80470768-42cd-4120-9077-661b5c6db499.png)

#### 검색 입력/버튼
- 입력을 한 후, 검색 버튼을 클릭하면 아래에 검색 결과 화면이 노출된다.
- 검색 입력과 버튼을 `form` 태그로 묶었고, `onSubmit`을 통해 제출한 후, 아래에 검색 결과 리스트가 출력되도록 했다.

![image](https://user-images.githubusercontent.com/88325253/168460249-7ca3ccf9-8538-49d9-b868-a5b7195e54d7.png)

- 검색 입력박스 아래로 한 줄에 하나의 영화를 노출하는 리스트형 목록으로 검색 결과가 노출된다.
- 검색결과 목록을 최하단으로 내렸을 경우, 이전 리스트 값에 다음 페이지의 리스트 값이 포함되도록 하여 화면에 출력하도록 했다.
  - 검색 결과가 없을 때까지 데이터가 출력되는 무한 스크롤 방식

![image](https://user-images.githubusercontent.com/88325253/168460638-43e55397-3433-4df3-96fb-8d3528ce4771.png)

- 만약 더이상 가져올 데이터가 없는데 계속 스크롤을 내리면 위와 같이 '더이상 불러올 영화가 없습니다' 라고 출력된다.
- `setTimeout`을 이용하여 화면에 1000ms 출력된 후, 사라진다.

#### 검색 결과 중 영화 클릭

![image](https://user-images.githubusercontent.com/88325253/168460747-f27c5b06-24ff-4cb2-9c6e-1a85bb02a5fb.png)

- 즐겨찾기가 된 영화는 빨간 태그로 표시되었고, 아닌 영화는 표시되지 않았다.
- 즐겨찾기에 저장되지 않은 영화를 클릭하면 즐겨찾기에 추가하겠냐는 팝업이 등장한다.
  - `추가` 시 `localStorage`에 저장되고, 빨간 태그가 생성된다.
  - `취소` 시 팝업이 사라진다.

![image](https://user-images.githubusercontent.com/88325253/168460872-266ef3d5-ad37-42cc-a338-5b6af2e44f25.png)

- 즐겨찾기에 저장된 영화를 클릭하면 즐겨찾기에서 삭제하겠냐는 팝업이 등장한다.
  - `삭제` 시 `localStorage`에서 삭제되고, 빨간 태그가 사라진다.
  - `취소` 시 팝업이 사라진다.

---

## 즐겨찾기 탭

![image](https://user-images.githubusercontent.com/88325253/168460913-c66b9b06-c28a-4933-bbe4-c0994b9bd8ab.png)

- 앞서 검색에서 추가했던 모든 영화들이 출력된다.

### 즐겨찾기 영화 리스트

![image](https://user-images.githubusercontent.com/88325253/168461025-4718fd0f-5bc0-490f-b742-5507750e0834.png)

- 즐겨찾기에 저장된 영화가 없을 경우 '즐겨찾기된 영화가 없습니다.' 라는 문구가 등장한다.

### 즐겨찾기 삭제

![image](https://user-images.githubusercontent.com/88325253/168460950-4c0df18f-da9b-4a1d-98d3-43454db3e6dc.png)

- 즐겨찾기 리스트의 영화를 클릭하면, 즐겨찾기 삭제 팝업이 등장한다.
  - `삭제` 시 `localStorage`에서 삭제되고, 화면 리스트에서 사라진다. 또한 검색 화면에서 빨간 태그가 사라진다.
  - `취소` 시 팝업이 사라진다.

