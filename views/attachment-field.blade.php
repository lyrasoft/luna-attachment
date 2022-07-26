<?php

/**
 * @var \Windwalker\Edge\Component\ComponentAttributes $attributes
 * @var \Windwalker\Edge\Wrapper\SlotWrapper           $slot
 */

$attributes = $attributes->class('c-attachment-field')
    ->exceptProps(
        [
            'items',
            'insertBtn',
            'accept',
            'name',
        ]
    );

$insertBtn = $insertBtn ?? false;

$options = [
    'accept' => $accept ?? false,
];

$name ??= 'attachments';
?>

<div {!! $attributes !!}>
    <x-attachment-list
        :items="$items"
        :insertBtn="$insertBtn"
    ></x-attachment-list>

    <x-attachment-uploader
        :name="$name"
        :options="$options"></x-attachment-uploader>
</div>