# LYRASOFT Attachment Uploader Package

![screenshot 2022-01-13 下午04 01 08](https://user-images.githubusercontent.com/34531644/180942543-b1cdd90e-e743-46af-9888-053a2388d9af.png)

## 安裝

```shell
composer require lyrasoft/attachment
```

需要更改 mig、entity、repo時可複製出來

```shell
php windwalker pkg:install lyrasoft/attachment -t migrations -t entity -t attachment_modal
```

## 使用

先到 `unicorn.php` 中註冊 `AttachmentPackage`

```
'unicorn' => [
        
        .....

        'providers' => [
            \Lyrasoft\Attachment\AttachmentPackage::class,
        ],
]
```

在頁面上include css、js、 以及component

```
$asset->css('vendor/lyrasoft/attachment/dist/attachment.min.css');
$asset->js('vendor/lyrasoft/attachment/dist/attachment.min.js');
```

```
<x-attachment-field 
    :items="$attachments"
    :insertBtn="true"
    :accept="'pdf,gif'"
    >
</x-attachment-field>
```

### Options

| name      | require     | Desc |
|-----------|-------------|---|
| name      | `attachments` | 欄位名稱，會自動後綴 `[]`
| items     | true        | 提供已上傳檔案列表做使用
| insertBtn | false       | 插入文章的btn
| accept    | false       | 限制檔案類型

如果要單獨使用 檔案列表 或是 上傳Input的話 也可以單獨使用

```
<x-attachment-list :items="$attachments" :insertBtn="true"></x-attachment-list>

<x-attachment-list :options="$options"></x-attachment-list>
```

## Slot 

如果你想自訂額外的按鈕的動作，可以用 `buttons` slot

```
        <x-attachment-field :items="$attachments">
            <x-slot name="buttons">
                @scope($item, $i)
               
                Do anything with $item
            </x-slot>
        </x-attachment-field>
```

### 備註
1. 記得要在 view 中利用`repo` 或是 `ORM` 取出 attachments 並塞入 field 的 option 中。
2. 在controller 內記得寫儲存及刪除的內容, 有刪除檔案的話可以從 `$app->input()` 中取得 `remove_attachments` 裡面是 attachment 的 ID
