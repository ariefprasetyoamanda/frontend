$(document).ready(function(){
    $.ajax({
        url: 'https://todo.api.devcode.gethired.id/activity-groups?email=ariefamandaprasetyo@gmail.com',
        type: 'get',
        dataType: 'JSON',
        success: function(response){
            var len = response.total;
            for(var i=0; i<len; i++){
                var id = response.data[i].id;
                var title = response.data[i].title;
                var created_at = response.data[i].created_at;
                   var render_div = "<div class='col-lg-4 col-4'>" +
                "<div class='small-box'>" +
                "<h3><a class='btn btn-info' role='button' data-toggle='modal' data-target='#modalDetailActivityGroup' onclick='detailActivityGroup("+id+");'>"+ title +"</a></h3>" +
                "<p><input type='hidden' id='id_activity_group_"+ id +"' value='"+ id +"'/></p>"+
                "<a href='#'>"+ created_at +" <i class='fas fa-arrow-circle-right'></i></a><a type='button' class='btn btn-warning' onclick='deleteActivityGroup("+id+")'><span aria-hidden='true'>&times;</span></button>"+
                "<p></p></div>";
                $("#div_activity").append(render_div);
            }

        }
    });

    $("#send_activity_group").click(function () {
        var title_activity_group = $("#title_activity_group").val();
        var email_activity_group = $("#email_activity_group").val();
        var comment_activity_group = $("#comment_activity_group").val();
        var button_close_add_activity_group = $(".close");
        $.ajax({
        type: "POST",
        url: "https://todo.api.devcode.gethired.id/activity-groups",
        data: {
            title:title_activity_group,
            email:email_activity_group,
            _comment : comment_activity_group
        },
        dataType: "json",
        success: function (data) {
        var obj = JSON.stringify(data);
        console.log("Success")
        console.log(obj);
        button_close_add_activity_group.click();
        location.reload(true);
        },
        error: function () {
        $(".result").append("Error occured");
        },
        });
        });

        $("#send_todo_items").click(function () {
            var title_todo_items = $("#title_todo_items").val();
            var comment_todo_items = $("#comment_todo_items").val();
            var add_id_group_activity = $("#add_id_group_activity").val();
            var button_close = $(".close");
            $.ajax({
            type: "POST",
            url: "https://todo.api.devcode.gethired.id/todo-items",
            data: {
                activity_group_id : add_id_group_activity,
                title:title_todo_items,
                _comment : comment_todo_items
            },
            dataType: "json",
            success: function (data) {
            var obj = JSON.stringify(data);
            console.log("Success");
            alert("Todo Berhasil disimpan");
            console.log(obj);
            button_close.click();
            location.reload(true);
            },
            error: function () {
            $(".result").append("Error occured");
            },
            });
            });
});

function detailActivityGroup(id){
    $("#detail_activity_group").html("");
    var id = $("#id_activity_group_"+id).val();
    $("#get_id_activity_group").val($("#id_activity_group_"+id).val());
    $("#add_id_group_activity").val($("#id_activity_group_"+id).val());
    $.ajax({
        url: 'https://todo.api.devcode.gethired.id/todo-items?activity_group_id='+id,
        type: 'get',
        dataType: 'JSON',
        success: function(response){
            var len = response.total;
             for(var i=0; i<len; i++){
                var id = response.data[i].id;
                var title = response.data[i].title;
                var render_div = "<li class='list-group-item list-group-item-primary'>"+title+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class='btn btn-warning' onclick='deleteTodo("+id+")'>Delete</button></li>";
                $("#detail_activity_group").append(render_div);
            }
        console.log(response);
        console.log("success");
        }
    });
}

function deleteTodo(id){
    $.ajax({
        url: 'https://todo.api.devcode.gethired.id/todo-items/'+id,
        type: 'delete',
        dataType: 'JSON',
        success: function(response){
            alert("Todo Berhasil dihapus");
            location.reload(true);
        }
    });
}

function deleteActivityGroup(id){
    $.ajax({
        url: 'https://todo.api.devcode.gethired.id/activity-groups/'+id,
        type: 'delete',
        dataType: 'JSON',
        success: function(response){
            alert("Activity Group Berhasil dihapus");
            location.reload(true);
        }
    });
}

