$(document).ready(function () {
    retrieveItems();

    function retrieveItems() {
        $.ajax({
            url: "item/retrieve/all",
            type: "GET",
            success: (data) => {
                $('tbody').empty();
                for (let i = 0; i < data.results.length; i++) {
                    addRow(data.results[i])

                }
            }
        })
    }

    function addRow(item) {
        var tr = $("<tr>")
        var btns = $("<div>").append($("<button>", {
            class: "btn btn-primary update btn-sm up",
            "data-toggle": "modal",
            "data-target": '#exampleModal',
            id: "update_" + item._id,
        }).text("update"),
            $("<button>", {
                class: "btn btn-danger del btn-sm",
                id: "delete_" + item._id,
            }).text("delete")
        )
        $(tr).append(
            $("<td>").text(item.name),
            $("<td>").text(item.quan),
            $("<td>").text(item.prio),
            $("<td>").append(btns)
        ).appendTo($('tbody'))
    }

    $(document).on("click", ".del", function () {
        $(this).parent().parent().parent().fadeOut("slow")
    })

    $("#btnAdd").click(function () {
        // e.preventDefault();
        var formData = {
            name: $("#name").val(),
            quan: $("#quantity").val(),
            prio: $("#priority").val()
        }

        $.ajax({
            url: "/item/create",
            data: formData,
            success: function (result) {
                retrieveItems();
                $("#getResultDiv").html("<strong>Success!</strong>");
                $('input').val("")
            },
            error: function (e) {
                $("#getResultDiv").html("<strong>Error</strong>");
                console.log("ERROR: ", e);
            }
        });
    })

    $("#btnSearch").click(function (e) {
        var id = $('.id_search').val()
        retrieveItems(id)
    })

    $(document).on("click", ".del", function () {
        var formData = {
            name: $("#name").val(),
            quan: $("#quantity").val(),
            prio: $("#priority").val()
        }
        var id = $(this).attr('id').split('_')
        $.ajax({
            url: "/item/delete/" + id[1],
            data: formData,
            success: function (result) {
                console.log('Success!!')
            },
            error: function (e) {
                console.log("ERROR: ", e);
            }
        });
    })
})
