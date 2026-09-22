/**
 * main.js - 添加记录页面的逻辑
 * 依赖: jQuery, Bootstrap, Bootstrap Datepicker
 */

$(document).ready(function() {
    
    // 1. 初始化日期选择器
    // 设置语言为中文 (因为引入了 zh-CN.min.js)
    // 格式设置为 yyyy-mm-dd，与你第一张截图的记账本一致
    $('#date').datepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        autoclose: true, // 选中日期后自动关闭
        todayHighlight: true // 高亮今天
    });

    // 2. 处理表单提交
    $('#recordForm').on('submit', function(e) {
        var item = $('#item').val().trim();
        var date = $('#date').val().trim();
        var amount = parseFloat($('#amount').val());

        if (!item) {
            alert('请输入事项！');
            e.preventDefault();   // 校验失败才拦截
            return;
        }
        if (!date) {
            alert('请选择发生时间！');
            e.preventDefault();
            return;
        }
        if (isNaN(amount) || amount <= 0) {
            alert('请输入有效的金额！');
            e.preventDefault();
            return;
        }
        // 校验通过 → 不拦截 → 表单自动 POST 到 /account
    });

});