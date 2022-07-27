<?php

/**
 * Global variables
 * --------------------------------------------------------------
 * @var $app           \Windwalker\Web\Application                 Global Application
 * @var $package       \Windwalker\Core\Package\AbstractPackage    Package object.
 * @var $view          \Windwalker\Data\Data                       Some information of this view.
 * @var $uri           \Windwalker\Uri\UriData                     Uri information, example: $uri->path
 * @var $datetime      \DateTime                                   PHP DateTime object of current time.
 * @var $helper        \Windwalker\Core\View\Helper\Set\HelperSet  The Windwalker HelperSet object.
 * @var $router        \Windwalker\Core\Router\PackageRouter       Router object.
 * @var $asset         \Windwalker\Core\Asset\AssetManager         The Asset manager.
 */

/**
 * @var \Windwalker\Edge\Component\ComponentAttributes $attributes
 * @var \Windwalker\Edge\Wrapper\SlotWrapper           $slot
 */

declare(strict_types=1);

$attributes = $attributes->class('c-attachment-uploader d-flex flex-column')
    ->exceptProps(
        [
            'options',
            'name'
        ]
    );

$name ??= 'attachments';
?>

<div id="accachment-uploader" {!! $attributes !!} data-options="{{ json_encode($options) }}">
    <input id="input-attachment-files" name="{{ $name }}[]" multiple type="file" class="form-control">
    <label class="px-3 c-file-drag-input__label"
        for="input-attachment-files">
        <div class="label-text" data-overlay-label>
            <span class="fa fa-upload"></span>
            @lang('unicorn.field.file.drag.placeholder.multiple')
        </div>
    </label>
</div>
