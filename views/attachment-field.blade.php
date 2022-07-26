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
        ]
    );

$insertBtn = $insertBtn ?? false;

$options = [
    'accept' => $accept ?? false,
];
?>

<div {!! $attributes !!}>
    <x-attachment-list
        :items="$items"
        :insertBtn="$insertBtn"
    ></x-attachment-list>

    <x-attachment-uploader
        :options="$options"></x-attachment-uploader>
</div>
