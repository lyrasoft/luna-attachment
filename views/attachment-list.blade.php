<?php

/**
 * @var \Windwalker\Edge\Component\ComponentAttributes $attributes
 * @var \Windwalker\Edge\Wrapper\SlotWrapper           $slot
 */

$attributes = $attributes->class('c-attachment-list')
    ->exceptProps(
        [
            'items',
            'insertBtn'
        ]
    );

$insertBtn = $insertBtn ?? false;
?>

<div uni-attachment-list {!! $attributes !!}>

    <table class="table table-borderless">
        <theader>
            <tr>
                <th>檔案名稱</th>
                <th width="15%">大小</th>
            </tr>
        </theader>

        <tbody>
        @foreach($items as $i => $item)
            <tr class="c-attachment-list__item">
                <td>{{ $item->title }}</td>
                <td width="15%">{{ round(($item->size / 1000000), 2) }} MB</td>

                @if ($buttons ?? '')
                    <td width="">
                        {!! $buttons(item: $item, i: $i) !!}
                    </td>
                @else
                    @if($insertBtn)
                        <td width="1%">
                            <button type="button" class="btn btn-sm btn-outline-danger"
                                data-bs-toggle="tooltip" data-bs-placement="top" title="插入到文章中"
                                data-href="{{ $item->path }}"
                                data-filename="{{ $item->title }}"
                                data-insert-btn="{{ is_string($insertBtn) ? $insertBtn : '' }}">
                                <i class="fa fa-sign-in-alt"></i>
                            </button>
                        </td>
                    @endif
                @endif
                <td width="1%">
                    <button type="button" class="btn btn-sm btn-outline-secondary" data-remove-btn
                        data-bs-toggle="tooltip" data-bs-placement="top" title="刪除">
                        <i class="fa fa-trash"></i>
                    </button>

                    <input type="hidden" name="remove_attachments[]" value="{{ $item->id }}"
                        disabled data-remove />
                </td>
            </tr>
        @endforeach
        </tbody>
    </table>
</div>
