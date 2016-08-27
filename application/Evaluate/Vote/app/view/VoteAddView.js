Ext.define('Evaluate_Vote.view.VoteAddView', {
    extend: 'Ext.window.Window',
    alias: 'widget.VoteAdd',
    requires: [
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.TextArea',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],
    height: 370,
    width: 500,
    minHeight: 370,
    minWidth: 500,
    layout: 'fit',
    title: '学生投票界面',
    maximizable: true,
    closeAction: 'hide',
    modal: true,

    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [{
                xtype: 'form',
                layout: 'column',
                bodyPadding: 10,
                items: [
                      {
                          xtype: 'textfield',
                          columnWidth: 1,
                          padding: 5,
                          fieldLabel: '课程名称<span style="color:red;">*</span>',
                          name: 'nvcCourseName',
                          labelWidth: 75,
                          hidden:true
                      },  {
                      xtype: 'textfield',
                      columnWidth: 1,
                      padding: 5,
                      fieldLabel: '选课课号<span style="color:red;">*</span>',
                      name: 'nvcElectiveNum',
                      labelWidth: 75,
                      hidden: true
                  }, {
                      xtype: 'textfield',
                      padding: '5 0 5 5',
                      columnWidth: 1,
                      padding: 5,
                      fieldLabel: '个人照片<span style="color:red;">*</span>',
                      name: 'nvcTeaPhoto',
                      id: 'Evaluate_VoteAdd_PhotoFiles',
                      readOnly: true,
                      labelWidth: 65,
                      hidden: true
                  }, {
                        xtype: 'textfield',
                        columnWidth: 0.75,
                        padding: 5,
                        fieldLabel: '任课教师<span style="color:red;">*</span>',
                        name: 'nvcName',
                        id: 'Evaluate_VoteAdd_nvcName',
                        labelWidth: 75,
                      readOnly:true
                    }, {
                        xtype: 'panel',
                        layout: 'column',
                        columnWidth: 0.5,
                        padding: 20,
                        items: [
                     {
                         xtype: 'image',
                         name: 'PhotoImage',
                         margin: "1% 5% 5% 20%",
                         itemId: 'Evaluate_VoteAdd_PhotoImage',
                         src: '/resource/images/photo.png',
                           columnWidth: 0.75,
                           width: 95,
                           height: 190,       
                     },
                        ]
                    }, {
                        xtype: 'textareafield',
                         columnWidth: 0.5,
                         padding: 5,
                         fieldLabel: '教师简介<span style="color:red;">*</span>',
                         name: 'nvcTeacher',
                         labelWidth: 25,
                         editable: false,
                         height: 200,
                        readOnly:true
                         //maxLength: 500
                     }
                ],
            }],
           
          

            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    ui: 'footer',
                    items: [
                        '->', {
                            xtype: 'button',
                            itemId: 'Evaluate_VoteAdd_OK',
                            text: '确 定'
                        },
                        {
                            xtype: 'button',
                            itemId: 'Evaluate_VoteAdd_Cancel',
                            text: '取 消'
                        }, '->'
                    ]
                }
            ]
        })
        ;
        me.callParent(arguments);
    }
});