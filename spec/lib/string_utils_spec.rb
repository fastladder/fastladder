# -*- coding: utf-8 -*-

require 'spec_helper'

describe :string_utils do

  describe 'utf8_roundtrip' do
    context 'turn encode to utf-8' do
      it 'utf-8 turns utf-8' do
        str = 'Ruby1.8をつかっている人はもういない'
        expect(str.utf8_roundtrip).to eq('Ruby1.8をつかっている人はもういない')
      end
      it 'euc-jp turns utf-8' do
        str = 'Ruby1.8をつかっている人はもういない'.encode('EUC-JP')
        expect(str.utf8_roundtrip).to eq('Ruby1.8をつかっている人はもういない')
      end
      it 'Shif-JIS turns utf-8' do
        str = 'Ruby1.8をつかっている人はもういない'.encode('Shift_JIS')
        expect(str.utf8_roundtrip).to eq('Ruby1.8をつかっている人はもういない')
      end
    end
  end

  describe '.scrub_html' do
    context 'strip danger element' do
      it 'tag' do
        expect('<script></script>foo'.scrub_html).to eq('foo')
      end

      it 'attribute' do
        expect('<i style="">foo</i>'.scrub_html).to eq('<i>foo</i>')
      end
    end

    context 'safe element' do
      it 'tag' do
        expect('<br/>'.scrub_html).to eq('<br>')
      end

      it 'attribute' do
        expect('<img src="foo.png">'.scrub_html).to eq('<img src="foo.png">')
      end

    end
  end
end
