<?php

declare(strict_types=1);

namespace App\View;

use Unicorn\Script\FormScript;
use Windwalker\Core\Asset\AssetService;
use Windwalker\Core\DateTime\ChronosService;
use Windwalker\Core\Language\LangService;
use Windwalker\Core\Pagination\Pagination;
use Windwalker\Core\Router\Navigator;
use Windwalker\Core\Application\AppContext;
use Windwalker\Core\Attributes\ViewModel;
use Windwalker\Core\Router\SystemUri;

use function Windwalker\uid;

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

/**
 * @var \Windwalker\Edge\Component\ComponentAttributes $attributes
 * @var \Windwalker\Edge\Wrapper\SlotWrapper           $slot
 */

$app->service(FormScript::class)->fileDrag();

$attributes = $attributes->class('c-attachment-uploader custom-file c-file-drag-input')
    ->exceptProps(
        [
            'options',
            'name'
        ]
    );

$attributes['options'] = json_encode($options);

$name ??= 'attachments';
$inputId ??= 'input-attachment-' . uid();

$accept = $options['accept'] ?? null;
$multiple = $options['multiple'] ?? false;
?>

<uni-file-drag {!! $attributes !!}>
    <input id="{{ $inputId }}" name="{{ $name }}[]"
        type="file"
        data-field-input
        class="form-control"
        @attr('multiple', $multiple ?: null)
        @attr('accept', $accept ?: null)
    >
    <label class="px-3 c-file-drag-input__label"
        data-overlay-label
        for="{{ $inputId }}">
        <span class="label-text" >
            <span class="fa fa-upload"></span>
        </span>
    </label>
</uni-file-drag>
