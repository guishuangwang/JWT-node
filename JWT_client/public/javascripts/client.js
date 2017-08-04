$(function() {
    $('button#login').click(function(e) {
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/api/auth",
            data: {
                username: 'weichao',
                password: 'weichao'
            },
            dataType: "json",
            success: function (response) {
                if(response.code === 200) {
                    localStorage.setItem('token', response.token);
                }
                else {
                    console.log(JSON.stringify(response));
                }
            }
        });
    });
    $('button#getUser').click(function(e) {
        var token = localStorage.getItem('token');
        if(!token) {
            alert('请先登录');
            return;
        }
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/api/user",
            headers: {
                'Authorization': 'Bearer ' + token
            },
            dataType: "json",
            success: function (response) {
                if(response.code === 200) {
                    alert(response.userInfo);
                    localStorage.setItem('token', response.token);
                }
                else{
                    alert('获取用户信息失败');
                }
            }
        });
    });
    $('button#logout').click(function(e) {
        localStorage.removeItem('token');
        location.reload();
    });
})