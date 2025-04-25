@props(['disabled' => false, 'error' => ''])

<input {{ $disabled ? 'disabled' : '' }} {!! $attributes->merge([
    'class' =>
        'rounded-md shadow-sm  focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-100' .
        ($error ? ' border-red-500' : ''),
]) !!}>
@if ($error)
		<p class="mt-1 text-sm text-red-500">{{ $error }}</p>
@endif
