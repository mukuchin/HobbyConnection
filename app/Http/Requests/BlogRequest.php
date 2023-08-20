<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BlogRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:100'],
            'period_start' => ['required', 'date'],
            'period_end' => ['required', 'date'],
            'description' => ['required', 'string', 'max:1000'],
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'タイトルは必須です。',
            'title.string' => 'タイトルは文字列で入力してください。',
            'title.max' => 'タイトルは100文字以内で入力してください。',
            'period_start.required' => '開始日は必須です。',
            'period_start.date' => '開始日は日付で入力してください。',
            'period_end.required' => '終了日は必須です。',
            'period_end.date' => '終了日は日付で入力してください。',
            'description.required' => '概要は必須です。',
            'description.string' => '概要は文字列で入力してください。',
            'description.max' => '概要は1000文字以内で入力してください。',
        ];
    }
}