<?php

declare(strict_types=1);

namespace App\View;

/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app       AppContext      Global Application
 * @var $view      ViewModel       Some information of this view.
 * @var $uri       SystemUri       Uri information, example: $uri->path
 * @var $chronos   ChronosService  PHP DateTime object of current time.
 * @var $nav       Navigator       Router object.
 * @var $asset     AssetService    The Asset service.
 * @var $lang      LangService     The lang service.
 */

use Unicorn\Script\UnicornScript;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Attributes\ViewModel;
use Windwalker\Core\Router\SystemUri;
use Windwalker\Edge\Component\ComponentAttributes;
use Windwalker\Edge\Wrapper\SlotWrapper;

use function Windwalker\uid;

/**
 * @var ComponentAttributes $attributes
 * @var SlotWrapper         $slot
 */

$attributes = $attributes->class('c-attachment-list')
    ->exceptProps(
        [
            'id',
            'items',
            'insertBtn',
            'sortable',
        ]
    );

$id ??= 'attachment-list-' . uid();

$attributes['id'] = $id;

$insertBtn = $insertBtn ?? false;
$sortable ??= false;
$name ??= 'attachments';

$options = [
    'sortable' => $sortable
];
?>

<div uni-attachment-list="@json($options)" {!! $attributes !!}>

    <input id="{{ $id }}-empty" name="{{ $name }}"
        type="hidden" value="__EMPTY_ARRAY__">

    <table class="table table-borderless">
        <thead>
        <tr>
            @if ($sortable)
                <th>
                    #
                </th>
            @endif
            <th>檔案名稱</th>
            <th width="15%" class="text-end">大小</th>
            <th colspan="10"></th>
        </tr>
        </thead>

        <tbody>
        @foreach($items as $i => $item)
            <tr data-id="{{ $item->id }}" class="c-attachment-list__item">
                @if ($sortable)
                    <td>
                        <i class="fa-regular fa-bars c-handle" style="cursor: move"></i>
                    </td>
                @endif
                <td>{{ $item->title }}</td>
                <td width="15%" class="text-nowrap text-end">{{ round(($item->size / 1000000), 2) }} MB</td>

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

                    <input name="{{ $name }}[]" type="hidden" value="{{ $item->id }}" />
                    <input type="hidden" name="remove_{{ $name }}[]" value="{{ $item->id }}"
                        disabled data-remove />

                    @if ($input ?? null)
                        {!! $input(item: $item, i: $i) !!}
                    @endif
                </td>
            </tr>
        @endforeach
        </tbody>
    </table>
</div>
