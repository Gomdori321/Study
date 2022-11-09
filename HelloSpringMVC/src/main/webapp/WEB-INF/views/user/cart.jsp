<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>

<h1>유저리스트</h1>
				<table border='1'>
					<thead>
						<tr>
							<td>성명</td>
							<td>주소</td>
							<td>전화번호</td>
							<td>성별</td>
							<td>이메일</td>
						</tr>
					</thead>
					<tbody>
						<c:forEach var="row" items="${data}">
							<tr>
								<td>${row.name}</td>
								<td>${row.address}</td>
								<td>${row.hp}</td>
								<td>${row.gender}</td>
								<td>${row.e_mail}</td>

							</tr>
						</c:forEach>
					</tbody>
				</table>
				
				
</body>
</html>